"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtpPassword = exports.smtpUser = exports.refresh_key = exports.access_key = exports.ttl = exports.db_url = exports.server_port = void 0;
require("dotenv/config");
exports.server_port = process.env.SERVER_PORT || 3001;
exports.db_url = process.env.DB_URL;
exports.ttl = process.env.CART_TTL || "120";
exports.access_key = process.env.ACCESS_TOKEN_KEY || "fjdsfhjd";
exports.refresh_key = process.env.REFRESH_TOKEN_KEY || "dfjhjddf";
//export const file_size = process.env.ALLOWED_FILE_TYPE;
//export const cloudinaryName = process.env.CLOUDINARY_NAME;
//export const cloudinaryApi = process.env.CLOUDINARY_API;
//problem secret key
//export const cloudinarKey = process.env.CLOUDINARY_SECRET_KEY
//export const client_url = process.env.CLIENT_URL || "http://localhost:3000";
exports.smtpUser = process.env.SMTP_USERNAME;
exports.smtpPassword = process.env.SMTP_PASSWORD;
console.log(exports.smtpPassword);
//# sourceMappingURL=secret.js.map