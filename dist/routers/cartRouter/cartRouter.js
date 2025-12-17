"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../../controllers/cartController");
const productRouter = express_1.default.Router();
productRouter.get('/', cartController_1.cartHealth);
productRouter.post('/add-to-cart', cartController_1.addCard);
productRouter.get('/clear', cartController_1.finalyCleanCard);
productRouter.get('/me', cartController_1.myCard);
productRouter.get('/remove/item/:productId', cartController_1.removeSingleItem);
productRouter.get('/views', cartController_1.viewCarts);
exports.default = productRouter;
//# sourceMappingURL=cartRouter.js.map