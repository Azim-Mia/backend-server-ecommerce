"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const viewCarts = async (req, res, next) => {
    const cardSessionId = req.headers['x-card-session-id'];
    console.log(cardSessionId);
    //decliar variable
    let cardData;
    //body data validate 
    try {
        //get card all product
        const { data } = await axios_1.default.get("http://localhost:3001/carts/me", {
            headers: {
                'x-card-session-id': cardSessionId,
            },
        });
        if (!data.items)
            return;
        //all data store
        cardData = data === null || data === void 0 ? void 0 : data.items;
        //create array orderItemsSchema data ;
        //check data empty
        if ((cardData === null || cardData === void 0 ? void 0 : cardData.length) == 0) {
            return res.status(400).json({ success: false, message: "cardItems is empty" });
        }
        ;
        //create array promise 
        const orderDetails = Promise.all(cardData.map(async (item) => {
            const { data: product } = await axios_1.default.get(`http://localhost:3001/products/find/${item.productId}`);
            return {
                productId: product.findProduct.productId,
                productName: product.findProduct.name,
                sku: product.findProduct.sku,
                price: product.findProduct.price,
                quantity: item.quantity,
                image: product.findProduct.image,
                color: item.color,
                size: item.size,
            };
        }));
        // resolve data Promise
        const orderItemsData = await orderDetails;
        //const subtotal = orderItemsData.reduce((acc:any, item:any)=>acc + item.price, 0);
        //const tax= 0;
        //const grandTotal = subtotal + tax;
        const items = orderItemsData.map((item) => ({
            ...item,
        }));
        return res.status(200).json({
            success: true, message: 'view cart successfull',
            result: items,
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
exports.default = viewCarts;
//# sourceMappingURL=viewCart.js.map