"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
require("dotenv/config");
var db_1 = require("./config/db");
var app_1 = require("./app");
// DB connect (serverless safe)
(0, db_1.default)().catch(console.error);
console.log('http://localhost:3001');
// ❌ app.listen() নাই
exports.default = app_1.default; // 🔥 এটা না থাকলে 404
