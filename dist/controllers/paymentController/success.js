"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const schemas_1 = require("../../../src/models/paymentModel/schemas");
const success = async (req, res, _next) => {
    try {
        const tran_id = req.params.tran_id;
        const data = await schemas_1.PaymentSchema.findOne({ tran_id: tran_id });
        console.log(data);
        if (!data) {
            return res.status(404).json({ success: false, message: "Not found Payment  tran_id" });
        }
        /*
        await PaymentSchema.updateOne({_id:data._id},{
          $set:{
            payedStatus:true,
          }
        })
        */
        const info = {
            cardSessionId: data.cardSessionId,
            userId: data.userId,
            tran_id: data.tran_id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            post_code: data.post_code,
        };
        await axios_1.default.request({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:3001/orders/checkout',
            data: info,
            headers: {
                'x-card-session-id': data.cardSessionId,
            }
        });
        res.redirect('http://localhost:3000/payment/success');
        return;
        //console.log(response.data + 'response')
        //return res.status(200).json({success:true, message:"successfull payment data", result:response?.data});
    }
    catch (err) {
        return res.json({ error: err });
    }
};
exports.default = success;
//# sourceMappingURL=success.js.map