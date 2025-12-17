"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/productModel/schemas");
const Delete = async (req, res, _next) => {
    const productId = req.body.productId;
    const deleteId = await schemas_1.Product.deleteOne({ productId: productId });
    if (!deleteId) {
        return res.status(400).json({ success: false, message: "product id is not found" });
    }
    return res.status(200).json({ success: true, message: "product id delete successfull" });
};
exports.default = Delete;
//# sourceMappingURL=delete.js.map