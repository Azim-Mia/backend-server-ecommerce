"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailController_1 = require("../../controllers/emailController");
const emailRouter = express_1.default.Router();
emailRouter.get('/', emailController_1.emailHealth);
emailRouter.post('/send', emailController_1.sendEmailController);
emailRouter.get('/finds', emailController_1.findEmailController);
exports.default = emailRouter;
//# sourceMappingURL=emailRouter.js.map