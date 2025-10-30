export const createAccessCookie = (res: any, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 10 * 60 * 1000, // 10 minutes
    httpOnly: true, // secure from frontend JS
    secure: false,  // true if using HTTPS
    sameSite: "lax", // allow same-site POSTs
  });
};

export const createRefreshCookie=(res:any, refreshToken:string)=>{
  res.cookie("refreshToken",refreshToken,{
    maxAge:7*24*60*60*1000,
   httpOnly: true, // secure from frontend JS
    secure: false,  // true if using HTTPS
    sameSite: "lax", // allow same-site POSTs
  });
  
}
export const createForgetPasswordCookie=(res:any, forgetPasswordToken:string)=>{
  res.cookie('forgetPassword',forgetPasswordToken,{
    maxAge:15*60*1000,
   httpOnly: true, // secure from frontend JS
    secure: false,  // true if using HTTPS
    sameSite: "lax", // allow same-site POSTs
  });
}
export const createCartSessionCookie=(res:any, sessionId:string)=>{
  res.cookie('sessionId',sessionId,{
    maxAge:5*60*1000,
      httpOnly: true, // secure from frontend JS
    secure: false,  // true if using HTTPS
    sameSite: "lax", // allow same-site POSTs
  });
}
