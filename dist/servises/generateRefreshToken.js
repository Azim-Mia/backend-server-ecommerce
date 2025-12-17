"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
var jwt = require('jsonwebtoken');
const generateRefreshToken = async (payload, refresh_key, expiresIn) => {
    const token = await jwt.sign(payload, refresh_key, { expiresIn: expiresIn });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateRefreshToken.js.map