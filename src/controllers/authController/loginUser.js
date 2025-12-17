"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs"); // compare undefined হতে পারে
//import jwt from 'jsonwebtoken';
//import axios from 'axios';
var schemas_1 = require("../../models/authModel/schemas");
var loghistory_1 = require("../../lib/loghistory");
var secret_1 = require("../../secret");
var generateAccessToken_1 = require("../../servises/generateAccessToken");
var generateRefreshToken_1 = require("../../servises/generateRefreshToken");
var makeCookie_1 = require("../../servises/makeCookie");
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, ipAddress, userAgent, parseBody, user, bodyPassword, isMatchPassword, accessToken, refresh_token, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                console.log('login process1');
                userData = zod_1.z.object({
                    email: zod_1.z.string().email(),
                    password: zod_1.z.string(),
                });
                ipAddress = req.headers['x-forwarded-for'] || req.ip || '';
                userAgent = req.headers['user-agent'] || '';
                parseBody = userData.safeParse({ email: req.body.email, password: req.body.password || '' });
                if (!parseBody.success) {
                    return [2 /*return*/, res.status(404).json({ error: parseBody.error.errors })];
                }
                ;
                return [4 /*yield*/, schemas_1.AuthUserSchema.findOne({ email: (_a = parseBody === null || parseBody === void 0 ? void 0 : parseBody.data) === null || _a === void 0 ? void 0 : _a.email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "Email not match", isLoggedIn: false })];
                }
                ;
                bodyPassword = req.body.password;
                console.log(bodyPassword);
                return [4 /*yield*/, bcrypt.compare(bodyPassword, user.password)];
            case 2:
                isMatchPassword = _b.sent();
                console.log('login process2', isMatchPassword);
                if (!!isMatchPassword) return [3 /*break*/, 4];
                //history create 
                return [4 /*yield*/, (0, loghistory_1.loghistory)({ userId: (user === null || user === void 0 ? void 0 : user.authUserId) || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: 'password is not match' })];
            case 3:
                //history create 
                _b.sent();
                return [2 /*return*/, res.status(404).json({ success: false, message: "Password not match", isLoggedIn: false })];
            case 4:
                ;
                if (!!user.verified) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, loghistory_1.loghistory)({ userId: (user === null || user === void 0 ? void 0 : user.authUserId) || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: 'user not verified' })];
            case 5:
                _b.sent();
                // history create
                return [2 /*return*/, res.status(404).json({ success: false, message: "user is not verified", isLoggedIn: false })];
            case 6:
                ;
                if (!(user.status !== 'ACTIVE')) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, loghistory_1.loghistory)({ userId: (user === null || user === void 0 ? void 0 : user.authUserId) || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "FAILED", description: "user not active" })];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(404).json({ success: false, message: "user not :".concat(user.status, ","), isLoggedIn: false })];
            case 8:
                ;
                (0, loghistory_1.loghistory)({ userId: (user === null || user === void 0 ? void 0 : user.authUserId) || "", ipAddress: ipAddress, userAgent: userAgent, attempt: "SUCCESS", description: "Successfull login" });
                return [4 /*yield*/, (0, generateAccessToken_1.generateAccessToken)({ id: user.authUserId, email: user.email, isLoggedIn: true }, secret_1.access_key, '5m')];
            case 9:
                accessToken = _b.sent();
                return [4 /*yield*/, (0, generateRefreshToken_1.generateRefreshToken)({ id: user.authUserId, email: user.email }, secret_1.refresh_key, '1080m')];
            case 10:
                refresh_token = _b.sent();
                res.setHeader('email', user.email);
                return [4 /*yield*/, (0, makeCookie_1.createAccessCookie)(res, accessToken)];
            case 11:
                _b.sent();
                return [4 /*yield*/, (0, makeCookie_1.createRefreshCookie)(res, refresh_token)];
            case 12:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: "successfull login", isLoggedIn: true })];
            case 13:
                error_1 = _b.sent();
                if (error_1 instanceof mongoose_1.default.Error) {
                    return [2 /*return*/, res.status(500).send(error_1)];
                }
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.default = loginUser;
