"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/authModel/schemas");
const findAllUser = async (req, res, _next) => {
    const result = await schemas_1.AuthUserSchema.find();
    if (!result) {
        return res.status(404).json({ success: false, message: "not found User id" });
    }
    const userLength = result.length;
    res.status(200).json({ success: true, message: "user return successfull", result, userLength });
};
exports.default = findAllUser;
//# sourceMappingURL=findAllUser.js.map