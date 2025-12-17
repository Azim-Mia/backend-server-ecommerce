"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_js_1 = require("../../models/inventoryModel/schemas.js");
const uuid_1 = require("uuid");
const Create = async (req, res, _next) => {
    try {
        const data = { inventoryId: (0, uuid_1.v4)(),
            actionType: req.body.actionType || null,
            ...req.body,
            historis: {
                quantityChange: Number(req.body.quantity),
                lastQuantity: 0,
                newQuantity: Number(req.body.quantity),
            },
        };
        const matchResult = await schemas_js_1.Inventory.findOne({ sku: req.body.sku });
        if (matchResult) {
            res.json({ success: false, message: "Sku already exits" });
            return;
        }
        const pendingInventory = new schemas_js_1.Inventory(data);
        const resultInventory = await pendingInventory.save();
        //cteate history
        const historyData = { historyId: data.inventoryId, ...req.body };
        const pendingHistory = new schemas_js_1.History(historyData);
        await pendingHistory.save();
        return res.status(201).json({ success: true, message: "create successfull", resultInventory });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.default = Create;
//# sourceMappingURL=create.js.map