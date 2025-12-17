"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import axios from 'axios';
require('dotenv').config();
const secret_1 = require("../../../secret");
const schemas_1 = require("../../../models/authModel/schemas");
//const user_port = process.env.USER_SERVER || "http://localhost:4003";
const forgetPasswordVerify = async (req, res, _next) => {
    var _a;
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (token === '') {
            return res.status(404).json({ success: false, message: "Body token is Empty" });
        }
        const decoded = await jsonwebtoken_1.default.verify(token, secret_1.access_key);
        if (!decoded) {
            return res.status(404).json({ success: false, message: "Not verified user token" });
        }
        ;
        //create update
        if (!password) {
            return res.status(404).json({ success: true, message: "password is empty" });
        }
        const updateOptions = { new: true, runValidators: true, context: 'query' };
        let updates = {};
        for (let key in req.body) {
            if (['password'].includes(key)) {
                updates[key] = req.body[key];
            }
        }
        const result = await schemas_1.AuthUserSchema.findByIdAndUpdate({ _id: decoded.id }, updates, updateOptions);
        if (!result) {
            res.json({ success: false, message: "user not Update" });
        }
        return res.status(201).json({ success: true, message: "successfull verify" });
    }
    catch (error) {
        const errData = ((_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) || error;
        console.log(error);
        return res.status(500).json({ success: false, message: "Intrnel server Error", Error: errData });
    }
};
exports.default = forgetPasswordVerify;
//# sourceMappingURL=forgetPasswordVerify.js.map