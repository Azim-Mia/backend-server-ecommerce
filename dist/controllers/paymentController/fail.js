"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../../src/models/paymentModel/schemas");
const failPayment = async (req, res, _next) => {
    const tran_id = req.params.tran_id;
    const result = await schemas_1.PaymentSchema.findOneAndDelete({ tran_id: tran_id });
    if (!result) {
        return res.status(404).json({ success: false, message: "Not found payment Data" });
    }
    res.redirect('http://localhost:3000/payment/fail');
    return;
};
exports.default = failPayment;
//# sourceMappingURL=fail.js.map