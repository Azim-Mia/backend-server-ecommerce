"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedCodeSchema = exports.LoginHistorySchema = exports.AuthUserSchema = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const { Schema, model } = require('mongoose');
const authUserSchema = new Schema({
    authUserId: {
        type: String,
        unique: true,
        require: [true, "not empt authId"],
    },
    name: {
        type: String,
        trim: true,
        tolowercase: true,
        required: [true, "not empt name"],
        minLength: [3, 'min length three character'],
        maxLength: [100, "max length 100"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        tolowercase: true,
        required: [true, "not empt Email"],
        maxLength: [100, "max length 100"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'no empty Password'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    address: {
        type: String,
        trim: true,
        minLength: [4, "min length four character"],
        maxLength: [200, "max length 100"],
    },
    phone: {
        type: String,
        trim: true,
        default: null,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "PENDING", "SUSPEND"],
        default: "PENDING",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    loginHistoris: {
        type: Array,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamp: true });
exports.AuthUserSchema = new model('AuthUser', authUserSchema);
const loginHistoriSchemas = new Schema({
    userId: {
        type: String,
        require: [true, "userId must be required"],
    },
    ipAddress: {
        type: String,
        default: "null",
    },
    userAgent: {
        type: String,
        default: "null",
    },
    description: {
        type: String,
        default: "null",
    },
    attempt: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        default: "SUCCESS",
    },
    loginAt: {
        type: Date,
        default: Date.now,
    },
    verificationCodes: [],
    user: {
        type: Object,
        ref: "User",
    },
});
exports.LoginHistorySchema = new model('LoginHistory', loginHistoriSchemas);
const verificationCodeSchemas = new Schema({
    userId: {
        type: String,
        trim: true,
        required: [true, "userId id is required"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "USED", "EXPIRE",],
        default: "PENDING",
    },
    code: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        enum: ["ACCOUNT_ACTIVATION", "POSSWORD_RESET", "EMAIL_CHANGE", "TOW_FACT_AUTH", "TOW_FACT_AUTH_DISABLE"],
        default: "ACCOUNT_ACTIVATION",
    },
    issuedAt: {
        type: Date,
        default: Date.now,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    verifidAt: {
        type: Date,
        default: null,
    }
});
exports.VerifiedCodeSchema = new model('VerifiedCode', verificationCodeSchemas);
//# sourceMappingURL=schemas.js.map