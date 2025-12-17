"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/orderModel/schemas");
const findOrderAll = async (req, res, _next) => {
    const result = await schemas_1.OrderDetailModel.find();
    if (!result) {
        return res.status(404).json({ success: false, message: "not found User id" });
    }
    res.status(200).json({ success: true, message: "user return successfull", data: result });
};
exports.default = findOrderAll;
//# sourceMappingURL=findOrderAll.js.map