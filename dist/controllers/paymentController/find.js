"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../../src/models/paymentModel/schemas");
const findPayment = async (req, res, _next) => {
    const tran_id = req.params.tran_id;
    const result = await schemas_1.PaymentSchema.findOne({ tran_id: tran_id });
    if (!result) {
        return res.status(404).json({ success: false, message: "Not found payment Data" });
    }
    return res.status(200).json({ success: true, message: "founded payment Data",
        result
    });
};
exports.default = findPayment;
//# sourceMappingURL=find.js.map