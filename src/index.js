"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./config/db");
var app_1 = require("./app");
(0, db_1.default)();
//require('dotenv').config();
//const server_port = process.env.SERVER_PORT || 3001;
/*app.listen(server_port,()=>{
try{
    console.log(`http://localhost:${server_port}`);
  connectDB()
  }catch(err:any){
    console.log(err)
  }
});*/
exports.default = app_1.default;
