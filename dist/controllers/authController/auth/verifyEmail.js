"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const axios_1 = __importDefault(require("axios"));
const schemas_1 = require("../../../models/authModel/schemas");
const secret_1 = require("../../../secret");
const generateAccessToken_1 = require("../../../servises/generateAccessToken");
const generateRefreshToken_1 = require("../../../servises/generateRefreshToken");
const makeCookie_1 = require("../../../servises/makeCookie");
const dataVlidation = zod_1.z.object({
    code: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
const verifyEmail = async (req, res, _next) => {
    var _a, _b, _c, _d;
    try {
        const bodyParse = dataVlidation.safeParse(req.body);
        const userEmail = req.headers['Email'];
        const exists = await schemas_1.VerifiedCodeSchema.findOne({ email: ((_a = bodyParse === null || bodyParse === void 0 ? void 0 : bodyParse.data) === null || _a === void 0 ? void 0 : _a.email) || userEmail });
        const user = await schemas_1.AuthUserSchema.findOne({ email: ((_b = bodyParse === null || bodyParse === void 0 ? void 0 : bodyParse.data) === null || _b === void 0 ? void 0 : _b.email) || userEmail });
        console.log(exists);
        if (!exists && !user) {
            return res.status(200).json({ success: false, messages: "Not Found User" });
        }
        ;
        if (exists.status === "USED") {
            return res.status(200).json({ success: false, messages: "Verify Code is used" });
        }
        if (exists.code !== ((_c = bodyParse === null || bodyParse === void 0 ? void 0 : bodyParse.data) === null || _c === void 0 ? void 0 : _c.code)) {
            return res.status(200).json({ success: false, messages: "Verify Code is not Match" });
        }
        const existAuthUser = await schemas_1.AuthUserSchema.findOne({ email: ((_d = bodyParse === null || bodyParse === void 0 ? void 0 : bodyParse.data) === null || _d === void 0 ? void 0 : _d.email) || userEmail });
        if (!existAuthUser) {
            return res.status(200).json({ success: false, messages: "AuthUserSchema Not Found" });
        }
        //update user verification schema
        const successVerifyCodeUpdate = await schemas_1.VerifiedCodeSchema.updateOne({ _id: exists._id }, { $set: {
                status: "USED"
            }
        });
        if (!successVerifyCodeUpdate) {
            return res.status(200).json({ success: false, messages: "user not update" });
        }
        //send success email
        await axios_1.default.post("http://localhost:3001/email/send", {
            recipient: exists.email,
            subject: "user verify",
            body: "successfull your account verify",
            source: "verify",
            sender: "provider in Bangladesh",
        });
        //cookie, token create
        const accessToken = await (0, generateAccessToken_1.generateAccessToken)({ id: user.authUserId, email: user.email, isLoggedIn: true }, secret_1.access_key, '5m');
        const refresh_token = await (0, generateRefreshToken_1.generateRefreshToken)({ id: user.authUserId, email: user.email }, secret_1.refresh_key, '10380m');
        res.setHeader('email', user.email);
        await (0, makeCookie_1.createAccessCookie)(res, accessToken);
        await (0, makeCookie_1.createRefreshCookie)(res, refresh_token);
        //success response
        return res.status(200).json({ success: true, messages: "update successfull" });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.default = verifyEmail;
//# sourceMappingURL=verifyEmail.js.map