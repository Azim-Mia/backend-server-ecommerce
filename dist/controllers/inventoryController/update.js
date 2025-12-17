"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/inventoryModel/schemas");
const Update = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const inventory = await schemas_1.Inventory.findOne({ inventoryId: id });
        const inventoryId = inventory._id;
        const inventoryIdFind = inventory.inventoryId;
        if (!inventory) {
            res.status(404).json({ success: false, message: "inventory not found" });
            return;
        }
        //change quantity
        let newQuantity = inventory.quantity;
        if (data.actionType == "IN") {
            newQuantity += Number(data.quantity);
        }
        else {
            newQuantity -= Number(data.quantity);
        }
        ;
        const updateOptions = { new: true, runValidators: true, context: 'query' };
        const filter = {
            inventoryId: inventoryIdFind,
            quantity: Number(newQuantity),
            actionType: req.body.actionType,
            historis: {
                historyId: inventoryIdFind,
                actionType: data.actionType,
                quantityChange: Number(data.quantity),
                newQuantity: newQuantity,
                lastQuantity: inventory.quantity || 0
            }
        };
        //update Inventory
        const updateResult = await schemas_1.Inventory.findByIdAndUpdate(inventoryId, filter, updateOptions);
        //updata history 
        //create a new history
        const historyResult = new schemas_1.History({ historyId: inventoryIdFind, actionType: data.actionType,
            quantityChange: data.quantity,
            newQuantity: newQuantity,
            lastQuantity: inventory.quantity || 0 });
        await historyResult.save();
        //end history creade
        res.json({ success: true, message: "update successfull", result: updateResult });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.default = Update;
//# sourceMappingURL=update.js.map