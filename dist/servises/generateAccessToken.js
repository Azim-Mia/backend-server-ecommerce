"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
var jwt = require('jsonwebtoken');
const generateAccessToken = async (payload, access_key, expiresIn) => {
    const token = await jwt.sign(payload, access_key, { expiresIn: expiresIn });
    return token;
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=generateAccessToken.js.map