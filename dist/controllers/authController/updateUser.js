"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userData = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email().optional(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
const updateUser = async (req, res, _next) => {
    const users = userData.safeParse({ ...req.body });
    if (!users.success) {
        res.status(404).json({ error: users.error.errors });
    }
    ;
    res.status(201).json({
        success: true,
        message: "user create successfull",
        result: users === null || users === void 0 ? void 0 : users.data,
    });
};
exports.default = updateUser;
//# sourceMappingURL=updateUser.js.map