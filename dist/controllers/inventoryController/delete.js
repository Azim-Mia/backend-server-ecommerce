"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/inventoryModel/schemas");
const Delete = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const deleteInventory = await schemas_1.Inventory.deleteOne({ inventoryId: id });
        if (deleteInventory.deletedCount == 0) {
            res.json({ success: false, message: "not found inventory" });
            return;
        }
        else {
            return res.json({ success: true, message: 'inventory deleted' });
        }
    }
    catch (error) {
        res.json({ success: false, message: "internal problem" });
    }
};
exports.default = Delete;
//# sourceMappingURL=delete.js.map