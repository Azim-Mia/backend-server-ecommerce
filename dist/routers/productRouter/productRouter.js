"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../../controllers/productController");
const productRouter = express_1.default.Router();
productRouter.get('/', productController_1.Health);
productRouter.post('/create', productController_1.Create);
productRouter.get('/finds', productController_1.Finds);
productRouter.get('/find/:id', productController_1.Find);
productRouter.delete('/delete/:id', productController_1.Delete);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map