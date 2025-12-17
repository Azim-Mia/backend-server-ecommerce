"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/authModel/schemas");
const findSingleUser = async (req, res, _next) => {
    const { id } = req.params;
    const filed = req.query.filed;
    let user;
    if (id) {
        user = await schemas_1.AuthUserSchema.findOne({ authUserId: id });
    }
    else {
        user = await schemas_1.AuthUserSchema.findOne({ _id: filed });
    }
    if (!user) {
        return res.status(404).json({ success: false, message: "Not Found User id. User auth/users?filed=user id,  key check query paramiter" });
    }
    res.status(200).json({ success: true, message: "user return successfull", user });
};
exports.default = findSingleUser;
//# sourceMappingURL=findOne.js.map