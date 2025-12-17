"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
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
//# sourceMappingURL=index.js.map