"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchService_1 = __importDefault(require("../../servises/searchService"));
const schemas_1 = require("../../models/orderModel/schemas");
const orderSearch = async (req, res, _next) => {
    try {
        const result = await (0, searchService_1.default)(schemas_1.OrderDetailModel, req);
        return res.status(201).json({
            success: true,
            message: 'search items successfull',
            result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'search problem',
        });
    }
};
exports.default = orderSearch;
//# sourceMappingURL=orderSearch.js.map