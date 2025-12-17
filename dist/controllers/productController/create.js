"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/productModel/schemas");
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const Create = async (req, res, _next) => {
    try {
        const matchData = await schemas_1.Product.findOne({ sku: req.body.sku });
        if (matchData) {
            res.status(200).json({ success: false, message: "product Already exist" });
            return;
        }
        //data initiallize
        const data = { productId: (0, uuid_1.v4)(), inventoryId: "", ...req.body };
        //product id need for inventory create
        const addProduct = new schemas_1.Product(data);
        //create inventory data 
        const datas = {
            sku: data.sku,
            productId: data.productId,
        };
        // create inventory
        const inventoryCreateSuccess = await axios_1.default.post('http://localhost:3001/inventoris/create', datas);
        console.log(inventoryCreateSuccess.data);
        if (!inventoryCreateSuccess.data) {
            return res.json({ success: false, message: "Product create not successfull " });
        }
        // inventory id use as product key 
        const { inventoryId, quantity } = inventoryCreateSuccess.data.resultInventory;
        console.log(inventoryId, quantity);
        //update product start...
        addProduct.inventoryId = inventoryId || null;
        addProduct.stock = quantity || 0;
        if (quantity > 0) {
            addProduct.stockStatus = "in stock";
        }
        //update product end...
        //finally save product
        const result = await addProduct.save();
        if (!result) {
            res.json({ success: false, message: "Product crate problem" });
            return;
        }
        //response result
        res.json({ success: true, message: "successfull", result: result });
    }
    catch (error) {
        res.json({ message: error.message });
    }
};
exports.default = Create;
//# sourceMappingURL=create.js.map