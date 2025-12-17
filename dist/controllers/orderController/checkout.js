"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const { v4: uuidv4 } = require('uuid');
const schemas_1 = require("../../models/orderModel/schemas");
const parseBodyValidate_1 = require("../../validatesSchema/parseBodyValidate");
const checkOut = async (req, res, next) => {
    var _a;
    //decliar variable
    let cardData, cardItemsData;
    //body data validate 
    const parseBody = parseBodyValidate_1.orderSchema.safeParse(req.body);
    //body data is exists
    if (!parseBody.success) {
        return res.status(400).json({ success: false, message: parseBody.error.errors });
    }
    ;
    try {
        //get card all product
        const { data } = await axios_1.default.get("http://localhost:3001/carts/me", {
            headers: {
                'x-card-session-id': parseBody.data.cardSessionId,
            },
        });
        //all data store
        cardData = data === null || data === void 0 ? void 0 : data.items;
        //create array orderItemsSchema data ;
        const cardItems = zod_1.z.array(parseBodyValidate_1.orderItemsSchema).safeParse(cardData);
        //check data empty
        if (((_a = cardItems.data) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            return res.status(400).json({ success: false, message: "cardItems is empty" });
        }
        ;
        //asign value  cardItemsData
        cardItemsData = cardItems === null || cardItems === void 0 ? void 0 : cardItems.data;
        if (!cardItemsData)
            return;
        //create array promise 
        const orderDetails = Promise.all(cardItemsData.map(async (item) => {
            const { data: product } = await axios_1.default.get(`http://localhost:3001/products/find/${item.productId}`);
            return {
                productId: product.findProduct.productId,
                productName: product.findProduct.name,
                sku: product.findProduct.sku,
                price: product.findProduct.price,
                quantity: Number(item.quantity),
                total: product.findProduct.price * item.quantity,
            };
        }));
        // resolve data Promise
        const orderItemsData = await orderDetails;
        const subtotal = orderItemsData.reduce((acc, item) => acc + item.total, 0);
        const tax = 0;
        const grandTotal = subtotal + tax;
        const orderInitialData = {
            id: uuidv4(),
            userId: parseBody.data.userId,
            name: parseBody.data.name,
            email: parseBody.data.email,
            address: parseBody.data.address,
            subtotal: subtotal,
            tax: tax,
            grandTotal: grandTotal,
            orderItems: {
                create: orderItemsData.map((item) => ({
                    ...item,
                })),
            }
        };
        //create order 
        const createOrder = new schemas_1.OrderDetailModel(orderInitialData);
        const result = await createOrder.save();
        const productAllItem = orderItemsData.map((item) => ({
            orderId: createOrder.id,
            ...item,
        }));
        const orderId = productAllItem.map(item => item.orderId);
        //create orderitem
        await schemas_1.OrderItemModel.insertMany(productAllItem);
        //clear cardhhhjhxhjgx
        await axios_1.default.get("http://localhost:3001/carts/clear", {
            headers: {
                'x-card-session-id': parseBody.data.cardSessionId,
            },
        });
        // semd email 
        await axios_1.default.post(`http:localhost:3001/email/send`, {
            recipient: parseBody.data.email,
            subject: "successfull order",
            body: `<div> 
     <h1> Amount:${grandTotal}</h1>
     <h2>orderId : ${orderId}</h2>
     </div>`,
            source: parseBody.data.email,
            sender: "Azim",
        });
        return res.status(200).json({
            success: true, message: 'order create successfull',
            payload: {
                result,
            }
        });
    }
    catch (error) {
        console.log(error);
        if (error.status == "400") {
            return res.status(400).json({ message: "order session Id is not valid" });
        }
        return res.status(400).json({ message: "Internal Server Error" });
    }
};
exports.default = checkOut;
//# sourceMappingURL=checkout.js.map