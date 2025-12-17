import express from 'express';
import {paymentController, paymentSuccessController, failPayment, cancelPayment,createPayment,findPayment,deletePayment} from '../../controllers/paymentController';
export const paymentRouter = express.Router();
paymentRouter.post('/', paymentController as any);
paymentRouter.post('/success/:tran_id',paymentSuccessController as any);
paymentRouter.post('/fail/:tran_id', failPayment as any);
paymentRouter.post('/cancel/:tran_id', cancelPayment as any);
paymentRouter.post('/create',createPayment as any)
paymentRouter.get('/find/:tran_id', findPayment as any);
paymentRouter.delete('/find/:tran_id', deletePayment as any);
