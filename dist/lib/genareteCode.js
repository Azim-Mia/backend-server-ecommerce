"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genareteCode = void 0;
const genareteCode = () => {
    const timestamp = new Date().getTime().toString();
    const randomNum = Math.floor(10 + Math.random() * 90);
    let code = (timestamp + randomNum).slice(-5);
    return code;
};
exports.genareteCode = genareteCode;
//# sourceMappingURL=genareteCode.js.map