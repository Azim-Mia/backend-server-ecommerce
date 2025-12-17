"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loghistory = void 0;
//import {z} from 'zod';
//import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs'
//import jwt from 'jsonwebtoken';
//import axios from 'axios';
const schemas_1 = require("../../src/models/authModel/schemas");
//export loghistory
const loghistory = async (info) => {
    await schemas_1.LoginHistorySchema.insertMany([
        {
            userId: info.userId,
            ipAddress: info.ipAddress,
            userAgent: info.userAgent,
            attempt: info.attempt,
            description: info.description,
        },
    ]);
};
exports.loghistory = loghistory;
//# sourceMappingURL=loghistory.js.map