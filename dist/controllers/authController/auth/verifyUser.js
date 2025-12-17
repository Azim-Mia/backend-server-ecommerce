"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const schemas_1 = require("../../../models/authModel/schemas");
//const user_port = process.env.USER_SERVER || "http://localhost:4003";
const verifyUser = async (req, res, _next) => {
    var _a;
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({ success: false, message: "Body token is Empty" });
        }
        const decoded = await jsonwebtoken_1.default.verify(token, 'azim');
        console.log(decoded);
        if (!decoded) {
            return res.status(404).json({ success: false, message: "Not verified user token" });
        }
        ;
        //create User
        const successUser = await schemas_1.AuthUserSchema.create(decoded);
        //update user
        if (!successUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Register. Try again"
            });
        }
        await schemas_1.AuthUserSchema.findByIdAndUpdate({ _id: successUser._id }, { $set: {
                verified: true,
                status: "ACTIVE"
            }
        });
        await axios_1.default.post('http://localhost:3001/profile/create', { userId: decoded.authUserId, email: decoded.email });
        return res.status(201).json({ success: true, message: "successfull verify" });
    }
    catch (error) {
        const errData = ((_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) || error;
        console.log(error);
        return res.status(500).json({ success: false, message: "Intrnel server Error", Error: errData });
    }
};
exports.default = verifyUser;
//# sourceMappingURL=verifyUser.js.map