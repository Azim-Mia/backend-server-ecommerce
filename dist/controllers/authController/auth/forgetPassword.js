"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const forgetPasswordEmailInfo_1 = __importDefault(require("../../../lib/forgetPasswordEmailInfo"));
const secret_1 = require("../../../secret");
const generateAccessToken_1 = require("../../../servises/generateAccessToken");
const makeCookie_1 = require("../../../servises/makeCookie");
const schemas_1 = require("../../../models/authModel/schemas");
const forgetPassword = async (req, res, _next) => {
    var _a;
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({ success: false, message: "Body Email is Empty" });
        }
        const user = await schemas_1.AuthUserSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        const accessToken = await (0, generateAccessToken_1.generateAccessToken)({ id: user._id, email: user.email }, secret_1.access_key, '5m');
        if (!accessToken) {
            return res.status(201).json({ success: true, message: "accessToken is not create" });
        }
        const info = {
            email: user.email,
            url: "http://localhost:3000",
            token: accessToken,
        };
        await (0, makeCookie_1.createAccessCookie)(res, accessToken);
        const eamilData = (0, forgetPasswordEmailInfo_1.default)(info);
        await axios_1.default.post("http://localhost:3001/email/send", eamilData);
        return res.status(201).json({ success: true, message: "Reset yuor Password. Check your email", token: accessToken });
    }
    catch (error) {
        const errData = ((_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) || error;
        console.log(error);
        return res.status(500).json({ success: false, message: "Intrnel server Error", Error: errData });
    }
};
exports.default = forgetPassword;
//# sourceMappingURL=forgetPassword.js.map