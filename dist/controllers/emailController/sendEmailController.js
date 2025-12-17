"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/emailModel/schemas");
const sendEmail_1 = __importDefault(require("../../servises/sendEmail"));
const sendEmailController = async (req, res, _next) => {
    try {
        const emailData = { ...req.body };
        console.log(emailData);
        await (0, sendEmail_1.default)(emailData);
        const storeEmailData = new schemas_1.EmailSchemas({
            recipient: emailData.recipient,
            subject: emailData.subject,
            body: emailData.body,
            source: emailData.source,
            sender: emailData.sender,
        });
        const send = await storeEmailData.save();
        return res.status(200).json({ success: true, message: "send email successfull", result: send });
    }
    catch (error) {
        return res.status(500).send(error);
        console.log(error);
    }
};
exports.default = sendEmailController;
//# sourceMappingURL=sendEmailController.js.map