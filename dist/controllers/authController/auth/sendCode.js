"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const schemas_1 = require("../../../models/authModel/schemas");
const genareteCode_1 = require("../../../lib/genareteCode");
const emailInfo_1 = __importDefault(require("../../../lib/emailInfo"));
const sendCode = async (req, res, _next) => {
    try {
        const code = (0, genareteCode_1.genareteCode)();
        const email = res.getHeader('email') || req.body.email;
        const exits = await schemas_1.AuthUserSchema.findOne({ email: email });
        if (!exits) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const info = {
            email: exits.email,
            code: code,
        };
        const findEmail = await schemas_1.VerifiedCodeSchema.findOne({ email: exits.email });
        if (findEmail) {
            //exist same table data update
            const update = await schemas_1.VerifiedCodeSchema.findByIdAndUpdate({ _id: findEmail._id }, {
                $set: {
                    code: info.code,
                    status: "PENDING",
                    type: 'TOW_FACT_AUTH',
                }
            });
            if (!update) {
                return res.status(403).json({ success: false, message: "verify code is not update" });
            }
            const emailData = (0, emailInfo_1.default)(info);
            await axios_1.default.post("http://localhost:3001/email/send", emailData);
        }
        else {
            //new create new verify table
            const createVerifyData = await new schemas_1.VerifiedCodeSchema({
                userId: exits.authUserId,
                email: info.email,
                status: 'PENDING',
                code: info.code,
            });
            const add = await createVerifyData.save();
            if (!add) {
                return res.status(403).json({ success: false, message: "verify data is not added" });
            }
            //email data service
            const emailData = (0, emailInfo_1.default)(info);
            //send email api
            await axios_1.default.post("http://localhost:3001/email/send", emailData);
        }
        //create headder
        res.setHeader('Email', info.email);
        return res.status(201).json({ message: "send code.Check Email" });
    }
    catch (err) {
        return res.status(201).json({ error: err });
    }
};
exports.default = sendCode;
//# sourceMappingURL=sendCode.js.map