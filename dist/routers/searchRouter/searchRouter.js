"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../../controllers/searchController");
const searchRouter = express_1.default.Router();
searchRouter.get('/filter/product', searchController_1.searchController);
searchRouter.get('/filter/orders', searchController_1.orderSearch);
exports.default = searchRouter;
//# sourceMappingURL=searchRouter.js.map