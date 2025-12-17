"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("cookie-parser");
const secret_1 = require("../secret");
const generateAccessToken_1 = require("../servises/generateAccessToken");
const makeCookie_1 = require("../servises/makeCookie");
const isLoggedIn = async (req, res, next) => {
    var _a, _b;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        const accessToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken;
        console.log("accessToken isLoggedIn Middleware " + accessToken, refreshToken);
        // ✅ যদি access token থাকে
        if (accessToken) {
            try {
                const check = jsonwebtoken_1.default.verify(accessToken, secret_1.access_key);
                if (!check) {
                    return res.json({ success: false, message: "Wrong token, login again" });
                }
                req.user = check; // চাইলে req.user এ attach করতে পারেন
                return next();
            }
            catch (err) {
                return res.json({ success: false, message: "Access token invalid or expired" });
            }
        }
        // ✅ যদি refresh token না থাকে
        if (!refreshToken) {
            return res.json({ success: false, message: "No refresh token, login again" });
        }
        // ✅ refresh token verify
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(refreshToken, secret_1.refresh_key);
        }
        catch (err) {
            return res.json({ success: false, message: "Invalid refresh token" });
        }
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id) || !(decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
            return res.json({ success: false, message: "Invalid token payload" });
        }
        // ✅ response header এ email সেট করা
        res.setHeader("email", decoded.email);
        console.log(decoded);
        // ✅ নতুন access token generate
        const token = await (0, generateAccessToken_1.generateAccessToken)({ id: decoded.id, email: decoded.email }, secret_1.access_key, "10m");
        if (!token) {
            return res.json({ success: false, message: "Failed to create access token" });
        }
        // ✅ access token cookie তে সেট করা
        await (0, makeCookie_1.createAccessCookie)(res, token);
        req.user = decoded;
        return next();
    }
    catch (err) {
        console.error("verifyToken error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map