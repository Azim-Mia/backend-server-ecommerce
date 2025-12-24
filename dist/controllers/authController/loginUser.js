"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcryptjs")); // compare undefined হতে পারে
//import jwt from 'jsonwebtoken';
//import axios from 'axios';
const schemas_1 = require("../../models/authModel/schemas");
const loghistory_1 = require("../../lib/loghistory");
const secret_1 = require("../../secret");
const generateAccessToken_1 = require("../../servises/generateAccessToken");
const generateRefreshToken_1 = require("../../servises/generateRefreshToken");
const makeCookie_1 = require("../../servises/makeCookie");
const loginUser = async (req, res, next) => {
    try {
        console.log('login process1');
        const userData = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string(),
        });
        const ipAddress = req.headers['x-forwarded-for'] || req.ip || '';
        const userAgent = req.headers['user-agent'] || '';
        const parseBody = userData.safeParse({ email: req.body.email, password: req.body.password || '' });
        if (!parseBody.success) {
            return res.status(404).json({ error: parseBody.error.errors });
        }
        ;
        const user = await schemas_1.AuthUserSchema.findOne({ email: parseBody?.data?.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email not match", isLoggedIn: false });
        }
        ;
        const bodyPassword = req.body.password;
        console.log(bodyPassword);
        const isMatchPassword = await bcrypt.compare(bodyPassword, user.password);
        console.log('login process2', isMatchPassword);
        if (!isMatchPassword) {
            //history create 
            await (0, loghistory_1.loghistory)({ userId: user?.authUserId || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: 'password is not match' });
            return res.status(404).json({ success: false, message: "Password not match", isLoggedIn: false });
        }
        ;
        //check verified user
        if (!user.verified) {
            await (0, loghistory_1.loghistory)({ userId: user?.authUserId || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: 'user not verified' });
            // history create
            return res.status(404).json({ success: false, message: "user is not verified", isLoggedIn: false });
        }
        ;
        //check login status user
        if (user.status !== 'ACTIVE') {
            await (0, loghistory_1.loghistory)({ userId: user?.authUserId || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: "user not active" });
            return res.status(404).json({ success: false, message: `user not :${user.status},`, isLoggedIn: false });
        }
        ;
        (0, loghistory_1.loghistory)({ userId: user?.authUserId || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "SUCCESS", description: "Successfull login" });
        //create authurazed
        const accessToken = await (0, generateAccessToken_1.generateAccessToken)({ id: user.authUserId, email: user.email, isLoggedIn: true }, secret_1.access_key, '5m');
        const refresh_token = await (0, generateRefreshToken_1.generateRefreshToken)({ id: user.authUserId, email: user.email }, secret_1.refresh_key, '1080m');
        res.setHeader('email', user.email);
        await (0, makeCookie_1.createAccessCookie)(res, accessToken);
        await (0, makeCookie_1.createRefreshCookie)(res, refresh_token);
        return res.status(200).json({ success: true, message: "successfull login", isLoggedIn: true });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error) {
            return res.status(500).send(error);
        }
    }
};
exports.default = loginUser;
//# sourceMappingURL=loginUser.js.map