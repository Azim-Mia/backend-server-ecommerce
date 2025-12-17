"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/inventoryModel/schemas");
const Find = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const findInventory = await schemas_1.Inventory.findOne({ inventoryId: id });
        const history = await schemas_1.History.find();
        //decending History
        const dscn = history.toSorted((a, b) => b.createAt - a.createAt);
        if (!findInventory) {
            res.json({ success: false, message: "Inventory Id not found. Correct Id parse body" });
            return;
        }
        else {
            res.json({ success: true, message: "return successfull", result: findInventory, History: dscn });
        }
    }
    catch (error) {
        res.json({ success: false, message: "Internal problem" });
    }
};
exports.default = Find;
//# sourceMappingURL=find.js.map