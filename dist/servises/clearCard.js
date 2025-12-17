"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rdConfig_1 = __importDefault(require("../config/rdConfig"));
const axios_1 = __importDefault(require("axios"));
//use session id
const clearCard = async (id) => {
    //get valid card 
    const data = await rdConfig_1.default.hgetall(`card:${id}`);
    //check this value
    if (Object.keys(data).length === 0) {
        return;
    }
    ;
    //create array 
    const items = Object.keys(data).map((key) => {
        const { inventoryId, quantity } = JSON.parse(data[key]);
        return {
            inventoryId,
            quantity,
            productId: key
        };
    });
    console.log("clearCard Items", items);
    // product inventory 
    const request = items.map(async (item) => {
        console.log("update Id:", item.inventoryId);
        return await axios_1.default.put(`http://localhost:3001/inventoris/update/${item.inventoryId}`, {
            quantity: Number(item.quantity),
            actionType: "IN"
        });
    });
    Promise.all(request);
    console.log("inventoryId update");
    //clear the card 
    await rdConfig_1.default.del(`card:${id}`);
};
exports.default = clearCard;
//# sourceMappingURL=clearCard.js.map