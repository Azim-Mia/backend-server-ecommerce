"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const schemas_1 = require("../../models/authModel/schemas");
const zod_1 = require("zod");
//const email_service = process.env.EMAIL_SERVICE || "http://localhost:4005";
const userData = zod_1.z.object({
    authUserId: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    image: zod_1.z.string().optional(),
});
const registerUser = async (req, res, _next) => {
    var _a, _b;
    try {
        // decliyar variablea
        const bodyParse = userData.safeParse({ authUserId: uuidv4(), ...req.body });
        if (!bodyParse.success) {
            res.status(404).json({ error: bodyParse.error.errors });
            return;
        }
        ;
        const emailMatch = (_a = bodyParse === null || bodyParse === void 0 ? void 0 : bodyParse.data) === null || _a === void 0 ? void 0 : _a.email;
        const exits = await schemas_1.AuthUserSchema.findOne({ email: emailMatch });
        if (exits) {
            return res.status(400).json({ success: false, message: "User already registred" });
            return;
        }
        ;
        const userAdd = new schemas_1.AuthUserSchema(bodyParse.data);
        if (!userAdd) {
            res.status(203).json({ success: false, message: "something Problem User not Create.Try again" });
            return;
        }
        ;
        //create Verify Token
        const { authUserId, name, email, verified, role } = userAdd;
        const tokenData = { authUserId: authUserId, name: name, email: email, password: (_b = bodyParse.data) === null || _b === void 0 ? void 0 : _b.password, verified: verified, role: role };
        const token = await jsonwebtoken_1.default.sign(tokenData, 'azim', { expiresIn: '1h' });
        const emailData = {
            recipient: req.body.email,
            subject: "Verify User now",
            body: `<div>
     <h1>Verify Token ${token}</h1>
    <a href="http://localhost:3000/verify/:${token}">Active</a>
     </div>`,
            source: 'user create',
            sender: req.body.name,
        };
        // send email Position 
        await axios_1.default.post("http://localhost:3001/email/send", emailData);
        return res.status(201).json({
            success: true,
            message: 'check your email. verify user now',
            payload: {
                token: token,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Intrnel server Error" });
    }
};
exports.default = registerUser;
//# sourceMappingURL=userCreate.js.map