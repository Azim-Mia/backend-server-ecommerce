"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../../src/models/paymentModel/schemas");
const createPayment = async (req, res, _next) => {
    const { cardSessionId, userId, tran_id, name, email, phone, address, post_code, district, thana, subtotal, tax, grandTotal, payedStatus, items } = req.body;
    const data = { cardSessionId, userId, tran_id, name, email, phone, address, post_code, district, thana, subtotal, tax, grandTotal, payedStatus, items };
    console.log("AAAAAAAAA  " + data.userId);
    const createNow = await new schemas_1.PaymentSchema(data);
    const payload = await createNow.save();
    if (!payload) {
        return res.status(404).json({ success: false, message: "payment data is not create" });
    }
    return res.status(200).json({ success: true, message: "payment data is create successfull" });
};
exports.default = createPayment;
//# sourceMappingURL=create.js.map