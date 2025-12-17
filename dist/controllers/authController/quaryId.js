"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/authModel/schemas");
const QuaryId = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const filed = req.query.filed;
        console.log(filed);
        let user;
        if (id) {
            user = await schemas_1.AuthUserSchema.findOne({ authUserId: id });
        }
        else {
            user = await schemas_1.AuthUserSchema.findOne({ _id: filed });
        }
        if (!user) {
            return res.status(404).json({ success: false, message: "Not Found User id" });
        }
        res.status(200).json({ success: true, message: "user return successfull", user });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.default = QuaryId;
//# sourceMappingURL=quaryId.js.map