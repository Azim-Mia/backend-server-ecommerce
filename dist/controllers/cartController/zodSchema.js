"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCardSchema = void 0;
const zod_1 = require("zod");
exports.addCardSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    inventoryId: zod_1.z.string(),
    quantity: zod_1.z.number(),
    color: zod_1.z.string(),
    size: zod_1.z.string()
});
//# sourceMappingURL=zodSchema.js.map