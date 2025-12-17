var jwt = require('jsonwebtoken');
export const generateAccessToken= async(payload:any, access_key:string, expiresIn:string)=>{
  const token =await jwt.sign(payload,access_key, {expiresIn:expiresIn});
  return token;
}