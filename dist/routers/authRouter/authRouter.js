"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/authController");
const authRouter = express_1.default.Router();
authRouter.post('/users/register', authController_1.registerUser);
authRouter.get('/users/finds', authController_1.findAllUser);
authRouter.get('/users/find/:id', authController_1.findSingleUser);
authRouter.post('/users/login', authController_1.loginUser);
authRouter.post('/users/email/verify', authController_1.verifyEmail);
authRouter.post('/users/verify/token', authController_1.verifyUser);
authRouter.post('/users/send/code', authController_1.sendCode);
authRouter.get('/users/q', authController_1.QuaryId);
authRouter.post('/users/password/forget', authController_1.forgetPassword);
authRouter.post('/users/password/forget/verify/:token', authController_1.forgetPasswordVerify);
authRouter.get('/users/logout', authController_1.logout);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map