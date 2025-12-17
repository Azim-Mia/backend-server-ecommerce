"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchService_1 = __importDefault(require("../../servises/searchService"));
const schemas_js_1 = require("../../models/productModel/schemas.js");
const searchController = async (req, res, _next) => {
    try {
        const result = await (0, searchService_1.default)(schemas_js_1.Product, req);
        return res.status(201).json({
            success: true,
            message: 'search items successfull',
            result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'search problem'
        });
    }
};
exports.default = searchController;
//# sourceMappingURL=searchController.js.map