"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = __importDefault(require("../../models/userModel/schemas"));
const zod_1 = require("zod");
const userData = zod_1.z.object({
    userId: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    image: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
const createProfile = async (req, res, _next) => {
    try {
        const users = userData.safeParse(req.body);
        if (!users.success) {
            res.status(404).json({ error: users.error.errors });
            return;
        }
        ;
        const exists = await schemas_1.default.findOne({ email: users.data.email });
        if (exists) {
            return res.status(201).json({ success: false, message: "Profile Already exists " });
        }
        const profileAdd = await new schemas_1.default(users.data);
        if (!profileAdd) {
            return res.status(400).json({ success: false, message: "User is not Register. Try again" });
        }
        const result = await profileAdd.save();
        if (!result) {
            return res.status(400).json({ success: false, message: "user create problem" });
        }
        ;
        res.status(201).json({
            success: true,
            message: "user create successfull",
            result: result,
        });
    }
    catch (error) {
        res.send(error.message);
    }
};
exports.default = createProfile;
//# sourceMappingURL=createProfile.js.map