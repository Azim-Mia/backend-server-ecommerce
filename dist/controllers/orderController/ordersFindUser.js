"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schemas_1 = require("../../models/orderModel/schemas");
const secret_1 = require("../../../secret");
const ordersFindUser = async (req, res, _next) => {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token missing. Please log in.',
            });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, secret_1.refresh_key);
        if (!decoded || !decoded.email) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token. Verification failed.',
            });
        }
        // Find profile by email
        const orderDetails = await schemas_1.OrderDetailModel.findOne({ email: decoded.email });
        if (!orderDetails) {
            return res.status(404).json({
                success: false,
                message: 'User profile not found.',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully.',
            data: orderDetails,
        });
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message,
        });
    }
};
exports.default = ordersFindUser;
//# sourceMappingURL=ordersFindUser.js.map