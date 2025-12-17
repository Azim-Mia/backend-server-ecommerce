"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../../controllers/paymentController");
exports.paymentRouter = express_1.default.Router();
exports.paymentRouter.post('/', paymentController_1.paymentController);
exports.paymentRouter.post('/success/:tran_id', paymentController_1.paymentSuccessController);
exports.paymentRouter.post('/fail/:tran_id', paymentController_1.failPayment);
exports.paymentRouter.post('/cancel/:tran_id', paymentController_1.cancelPayment);
exports.paymentRouter.post('/create', paymentController_1.createPayment);
exports.paymentRouter.get('/find/:tran_id', paymentController_1.findPayment);
exports.paymentRouter.delete('/find/:tran_id', paymentController_1.deletePayment);
//# sourceMappingURL=paymentRouter.js.map