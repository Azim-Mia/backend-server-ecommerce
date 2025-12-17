"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rdConfig_1 = __importDefault(require("../../config/rdConfig"));
const finalyCleanCard = async (req, res, _next) => {
    try {
        const cardSessionId = req.headers[`x-card-session-id`] || null;
        if (!cardSessionId) {
            return res.status(400).json({ success: false, message: "cardSessionId is x-card-session-id empty" });
        }
        // check the store sessionId
        const exists = await rdConfig_1.default.exists(`sessions:${cardSessionId}`);
        if (!exists) {
            delete req.headers['x-card-session-id'];
            return res.status(400).json({ success: false, message: "card sessions is not exists" });
        }
        await rdConfig_1.default.del(`card:${cardSessionId}`);
        await rdConfig_1.default.del(`sessions:${cardSessionId}`);
        delete req.headers['x-card-session-id'];
        return res.status(200).json({ success: true, message: "all clear card" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ seccess: false, message: "interner Server Error" });
    }
};
exports.default = finalyCleanCard;
//# sourceMappingURL=finalyCleanCard.js.map