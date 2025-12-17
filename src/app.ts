import express, {Request,Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
const cookieParser = require('cookie-parser')

import cors from 'cors';
import morgan from 'morgan';
import productRouter from './routers/productRouter/productRouter'
import cartRouter from './routers/cartRouter/cartRouter'
import emailRouter from './routers/emailRouter/emailRouter'
import inventoryRouter from './routers/inventoryRouter/inventoryRouter'

import userRouter from './routers/userRouter/userRouter'
import authRouter from './routers/authRouter/authRouter'
import orderRouter from './routers/orderRouter/orderRouter'
import {paymentRouter} from './routers/paymentRouter/paymentRouter';
import searchRouter from './routers/searchRouter/searchRouter'
import './events/sessionStore'
 const app =express();
 app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000","http://localhost:8158","http://localhost:3001","http://localhost:3002"],
methods:["PUT","POST","GET","UPDATE"],
credentials:true,
}));
app.get('/', (_req:Request, res:Response)=>{
  res.status(200).json({
    success:true,
    message:'health success'
  })
})
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/email', emailRouter);
app.use('/inventoris', inventoryRouter );
app.use('/profile', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/payment', paymentRouter);
app.use('/', searchRouter);
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).send("Not Found Route");
});
app.use((err:any, _req:Request, res:Response, _next:NextFunction)=>{
  console.error(err.stack);
 res.status(500).json({success:false, message:"Internal Server Error"})
})
export default app