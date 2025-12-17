"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../../controllers/inventoryController");
const inventoryRouter = express_1.default.Router();
inventoryRouter.get('/', inventoryController_1.inventoryHealth);
inventoryRouter.post('/create', inventoryController_1.Create);
inventoryRouter.put('/update/:id', inventoryController_1.Update);
inventoryRouter.get('/finds', inventoryController_1.Finds);
inventoryRouter.delete('/delete/:id', inventoryController_1.Delete);
inventoryRouter.get('/find/:id', inventoryController_1.Find);
exports.default = inventoryRouter;
//# sourceMappingURL=inventoryRouter.js.map