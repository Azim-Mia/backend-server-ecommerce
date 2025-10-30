import * as express from "express";
import { userHealth,createProfile ,findProfile} from '../../../src/controllers/userController';
import { isLoggedIn } from "../../../src/middlewares/isLoggedIn";
const userRouter = express.Router();
userRouter.get('/',userHealth);
userRouter.post('/create',createProfile as any);
userRouter.get('/find',isLoggedIn as any, findProfile as any);

export default userRouter;