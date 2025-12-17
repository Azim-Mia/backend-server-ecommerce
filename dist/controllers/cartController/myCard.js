"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rdConfig_1 = __importDefault(require("../../config/rdConfig"));
//import {addCardSchema} from './zodSchema';
//import { ttl  } from '../envVariable/secret';
const axios_1 = __importDefault(require("axios"));
const myCard = async (req, res, next) => {
    try {
        const cardSessionId = req.headers['x-card-session-id'] || null;
        if (!cardSessionId) {
            return res.status(400).json({ success: false, data: [{}] });
        }
        const session = await rdConfig_1.default.exists(`sessions:${cardSessionId}`);
        if (!session) {
            await rdConfig_1.default.del(`card:${cardSessionId}`);
            return res.status(400).json({ success: false, data: [{}] });
        }
        const items = await rdConfig_1.default.hgetall(`card:${cardSessionId}`);
        if (Object.keys(items).length === 0) {
            return res.status(200).json({ success: false, message: [] });
        }
        //formatItems the data 
        const formatItems = Object.keys(items).map(key => {
            const { quantity, inventoryId, color, size } = JSON.parse(items[key]);
            return {
                inventoryId,
                productId: key,
                quantity,
                color,
                size
            };
        });
        const orderDetails = Promise.all(formatItems.map(async (item) => {
            const { data: product } = await axios_1.default.get(`http://localhost:3001/products/find/${item.productId}`);
            return {
                price: product.findProduct.price,
                quantity: item.quantity,
                total: product.findProduct.price * item.quantity,
            };
        }));
        const orderItemsData = await orderDetails;
        const subtotal = orderItemsData.reduce((acc, item) => acc + item.total, 0);
        return res.status(200).json({ success: true, message: "retun successfull", items: formatItems, subtotal });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.default = myCard;
//# sourceMappingURL=myCard.js.map