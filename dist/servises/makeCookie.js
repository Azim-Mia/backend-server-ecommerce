"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartSessionCookie = exports.createForgetPasswordCookie = exports.createRefreshCookie = exports.createAccessCookie = void 0;
const createAccessCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        maxAge: 10 * 60 * 1000, // 10 minutes
        httpOnly: true, // secure from frontend JS
        secure: false, // true if using HTTPS
        sameSite: "lax", // allow same-site POSTs
    });
};
exports.createAccessCookie = createAccessCookie;
const createRefreshCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // secure from frontend JS
        secure: false, // true if using HTTPS
        sameSite: "lax", // allow same-site POSTs
    });
};
exports.createRefreshCookie = createRefreshCookie;
const createForgetPasswordCookie = (res, forgetPasswordToken) => {
    res.cookie('forgetPassword', forgetPasswordToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true, // secure from frontend JS
        secure: false, // true if using HTTPS
        sameSite: "lax", // allow same-site POSTs
    });
};
exports.createForgetPasswordCookie = createForgetPasswordCookie;
const createCartSessionCookie = (res, sessionId) => {
    res.cookie('sessionId', sessionId, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true, // secure from frontend JS
        secure: false, // true if using HTTPS
        sameSite: "lax", // allow same-site POSTs
    });
};
exports.createCartSessionCookie = createCartSessionCookie;
//# sourceMappingURL=makeCookie.js.map