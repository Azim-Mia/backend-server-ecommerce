"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailInfo = (info) => {
    const emailData = {
        recipient: (info === null || info === void 0 ? void 0 : info.email) || '',
        subject: "Verify user login now",
        body: `<div>
     <h1>Verify Token ${info === null || info === void 0 ? void 0 : info.code}</h1>
    <a href="http://localhost:3000/verify">Active</a>
     </div>`,
        source: 'user create',
        sender: "",
    };
    return emailData;
};
exports.default = emailInfo;
//# sourceMappingURL=emailInfo.js.map