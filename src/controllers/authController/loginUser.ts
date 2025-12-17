import {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import mongoose from 'mongoose';
import * as bcrypt from "bcryptjs"; // compare undefined হতে পারে
//import jwt from 'jsonwebtoken';
//import axios from 'axios';
import { AuthUserSchema } from '../../models/authModel/schemas';
import {loghistory} from '../../lib/loghistory'
import {access_key,refresh_key} from '../../secret';
import {generateAccessToken} from '../../servises/generateAccessToken'
import { generateRefreshToken } from '../../servises/generateRefreshToken'
import {createAccessCookie,createRefreshCookie} from '../../servises/makeCookie'
const loginUser = async(req:Request, res:Response, next:NextFunction)=>{
  try{
    console.log('login process1')
    const userData = z.object({
  email:z.string().email(),
  password:z.string(),
});
const ipAddress = req.headers['x-forwarded-for'] as string || req.ip || '';
const userAgent = req.headers['user-agent'] || '';

const parseBody = userData.safeParse({email:req.body.email,password:req.body.password || ''});
if(!parseBody.success){
   return res.status(404).json({error: parseBody.error.errors});
};
const user = await AuthUserSchema.findOne({email:parseBody?.data?.email});
if(!user){
      return res.status(404).json({success:false,message:"Email not match",isLoggedIn:false});
    };
    const bodyPassword:string = req.body.password;
    console.log(bodyPassword)
const isMatchPassword =await bcrypt.compare(bodyPassword, user.password);
console.log('login process2',isMatchPassword)
if(!isMatchPassword){
  //history create 
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:'password is not match'});
  return res.status(404).json({success:false,message:"Password not match", isLoggedIn:false})
};

//check verified user
if(!user.verified){
 await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:'user not verified'});
  // history create
  return res.status(404).json({success:false, message:"user is not verified",isLoggedIn:false});
};
//check login status user
    
if(user.status !== 'ACTIVE'){
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:"user not active"});
   return res.status(404).json({success:false,message:`user not :${user.status},`,isLoggedIn:false });
};
loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"SUCCESS",description:"Successfull login"});
//create authurazed
const accessToken= await generateAccessToken({id:user.authUserId, email:user.email, isLoggedIn:true}, access_key, '5m');
const refresh_token = await generateRefreshToken({id:user.authUserId,email:user.email}, refresh_key, '1080m')
res.setHeader('email', user.email);
await createAccessCookie(res,accessToken);
await createRefreshCookie(res,refresh_token);
return res.status(200).json({success:true, message:"successfull login",isLoggedIn:true});
  }catch(error:any){
    if( error instanceof mongoose.Error){
    return res.status(500).send(error);
    }
  }
}
export default loginUser;