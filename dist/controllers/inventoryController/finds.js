"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/inventoryModel/schemas");
const Finds = async (req, res, _next) => {
    try {
        const result = await schemas_1.Inventory.find();
        if (!result) {
            res.status(404).json({ success: false, message: "Not found" });
        }
        res.status(200).json({ success: true, message: "inventory return successfull", result: result });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "server or mongoose problem" });
    }
};
exports.default = Finds;
//# sourceMappingURL=finds.js.map