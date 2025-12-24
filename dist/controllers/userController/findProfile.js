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
const jwt = __importStar(require("jsonwebtoken")); // <-- ঠিকভাবে import করা হলো
const schemas_1 = __importDefault(require("../../models/userModel/schemas"));
const secret_1 = require("../../secret");
const findProfile = async (req, res, _next) => {
    try {
        console.log("BBBBBBBBBBBB");
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token missing. Please log in.',
            });
        }
        console.log("EEEEEEEE RefreshToken: " + refreshToken);
        // Token verify
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, secret_1.refresh_key);
        }
        catch (err) {
            console.error("JWT verification failed:", err.message);
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token. Verification failed.',
            });
        }
        console.log("CCCCCCCC Decoded:", decoded);
        if (!decoded || !decoded.email) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token payload.',
            });
        }
        // Find profile by email
        const profile = await schemas_1.default.findOne({ email: decoded.email });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'User profile not found.',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully.',
            data: profile,
        });
    }
    catch (error) {
        console.error('Internal error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message,
        });
    }
};
exports.default = findProfile;
//# sourceMappingURL=findProfile.js.map