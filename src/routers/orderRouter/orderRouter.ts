import * as express from "express";
import { orderHealth, checkOut,findOrderAll,ordersFindUser} from '../../controllers/orderController';
import { isLoggedIn } from "../../../src/middlewares/isLoggedIn";
const orderRouter = express.Router();
orderRouter.get('/',orderHealth);
orderRouter.get('/finds', findOrderAll as any);
orderRouter.get('/find',isLoggedIn as any,ordersFindUser as any);
orderRouter.post('/checkout',checkOut as any);
export default orderRouter;