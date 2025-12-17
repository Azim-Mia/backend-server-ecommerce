"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/productModel/schemas");
const Finds = async (_req, res, _next) => {
    try {
        const findProduct = await schemas_1.Product.find().select("name _id productId inventoryId price quantity");
        if (!findProduct) {
            res.status(404).json({ success: false, message: "Product is not found" });
            return;
        }
        ;
        const productLength = findProduct.length;
        res.status(200).json({ success: true, message: "Product return successfull", findProduct, productLength });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Interneal server problem" });
    }
};
exports.default = Finds;
//# sourceMappingURL=finds.js.map