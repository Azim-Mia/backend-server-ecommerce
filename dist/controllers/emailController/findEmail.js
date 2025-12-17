"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/emailModel/schemas");
const findEmailController = async (req, res, _next) => {
    const result = await schemas_1.EmailSchemas.find();
    if (!result) {
        return res.status(404).json({ success: false, messages: "Email find Problem" });
    }
    ;
    return res.status(200).json({ success: true, message: "email return successfull", payload: result });
};
exports.default = findEmailController;
//# sourceMappingURL=findEmail.js.map