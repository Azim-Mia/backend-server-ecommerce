"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cancelPayment = async (_req, res, _next) => {
    return res.send("payment Cancel");
    /* if(!res.ok){
       res.redirect(`http://localhost:3000/payment/fail`)
     }*/
};
exports.default = cancelPayment;
//# sourceMappingURL=cancel.js.map