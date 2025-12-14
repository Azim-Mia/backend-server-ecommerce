/*import connectDB from './config/db.ts';import {default as app } from './app';
require('dotenv').config();
const server_port = process.env.SERVER_PORT || 3001;
app.listen(server_port,()=>{
  try{
    console.log(`http://localhost:${server_port}`);
  connectDB()
  }catch(err:any){
    console.log(err)
  }
});
*/
import "dotenv/config";
import connectDB from "./config/db";
import app from "./app";

// DB connect (serverless safe)
connectDB().catch(console.error);
console.log('http://localhost:3001')
// ❌ app.listen() নাই
export default app; // 🔥 এটা না থাকলে 404
