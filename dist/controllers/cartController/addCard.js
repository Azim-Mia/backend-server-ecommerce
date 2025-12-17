"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
const axios_1 = __importDefault(require("axios"));
const rdConfig_1 = __importDefault(require("../../config/rdConfig"));
const zodSchema_1 = require("./zodSchema");
const makeCookie_1 = require("../../servises/makeCookie");
const secret_1 = require("../../secret");
const addCard = async (req, res, _next) => {
    try {
        const parseBody = zodSchema_1.addCardSchema.safeParse(req.body);
        if (!parseBody.success) {
            return res.status(400).json({ success: false, message: parseBody.error.errors });
        }
        // check cardSessionId if exists
        let cardSessionId = req.headers['x-card-session-id'] || null;
        console.log("Backend Cart add " + cardSessionId);
        if (cardSessionId) {
            const exists = await rdConfig_1.default.exists(`sessions:${cardSessionId}`);
            console.log("sessionId is exists :" + exists);
            if (!exists) {
                cardSessionId = null;
            }
        }
        ;
        //create session id
        if (!cardSessionId) {
            cardSessionId = uuidv4();
            await rdConfig_1.default.setex(`sessions:${cardSessionId}`, secret_1.ttl, cardSessionId);
            res.setHeader(`x-card-session-id`, cardSessionId);
        }
        await (0, makeCookie_1.createCartSessionCookie)(res, cardSessionId);
        //check the inventory abilable
        const { data } = await axios_1.default.get(`http://localhost:3001/inventoris/find/${parseBody.data.inventoryId}`);
        if (data.success == false) {
            return res.status(400).json({ success: false, message: "Inventory ID Not Match.." });
        }
        if (data.result.quantity < Number(parseBody.data.quantity) || Number(parseBody.data.quantity) < 1) {
            return res.status(202).json({ success: false, message: "quantity is not ableable" });
        }
        ;
        //update inventory 
        await axios_1.default.put(`http://localhost:3001/inventoris/update/${parseBody.data.inventoryId}`, {
            quantity: Number(parseBody.data.quantity),
            actionType: "OUT"
        });
        //add item to the card
        //if product exists 
        // lgic parseBody.data.quantity - existing quantity
        await rdConfig_1.default.hset(`card:${cardSessionId}`, parseBody.data.productId, JSON.stringify({
            inventoryId: parseBody.data.inventoryId,
            quantity: Number(parseBody.data.quantity),
            color: parseBody.data.color,
            size: parseBody.data.size || '',
        }));
        return res.status(200).json({ success: true, message: "add to card successfull", sessionId: cardSessionId });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error add-to-card' });
    }
};
exports.default = addCard;
//# sourceMappingURL=addCard.js.map