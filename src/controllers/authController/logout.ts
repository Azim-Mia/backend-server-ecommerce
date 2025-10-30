import {Request, Response, NextFunction} from 'express';
//import {access_key,refresh_key} from '/data/data/com.termux/files/home/e-commerce-mvc/secret';
const logout = async(req:Request,res:Response,_next:NextFunction)=>{
  try{
  const refreshTokens=req.cookies.refreshToken;
  const accessToken=req.cookies.accessToken;  
  console.log(accessToken + ' accessToken')
   if( !accessToken || !refreshTokens){
  return res.status(200).json({
  success:false,
  message:"Cookies is Empty. Login Now",
})
}
 await res.clearCookie('accessToken', {
httpOnly: true,
  secure: true, // HTTPS হলে
  sameSite: "none",
  path: "/"
});
await res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: true, // HTTPS হলে
  sameSite: "none",
  path: "/"
});
return res.status(200).json({
  success:true,
  message:"successFull cookie clear",
})
}catch(error:any){
 console.error("error:__", error.message); 
 return res.status(200).json({
  success:false,
  message:error.message,
})
}
}
export default logout