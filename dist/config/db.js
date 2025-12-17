"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const secret_1 = require("../secret");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(secret_1.db_url);
        console.log("E-commerce-mvc connection successfull");
        //process.exit(1);
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map