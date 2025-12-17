"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../../models/productModel/schemas");
const axios_1 = __importDefault(require("axios"));
const find = async (req, res, _next) => {
    try {
        const { id } = req.params;
        let inventoryId;
        const findProduct = await schemas_1.Product.findOne({ productId: id });
        //console.log(userId);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Not found Product this " + id });
        }
        ;
        if (findProduct.inventoryId === "null") {
            const datas = {
                id: findProduct._id,
                sku: findProduct.sku,
                productId: findProduct._id,
            };
            const createInventory = await axios_1.default.post("http://localhost:3001/inventoris/create", datas);
            console.log(createInventory.data);
            //asign value inventoryId
            inventoryId = createInventory.data.resultInventory.id;
            //cheack value
            if (!createInventory) {
                res.status(404).json({ success: false, message: "inventory not create" });
            }
            else {
                const updateOptions = { new: true, runValidators: true, context: 'query' };
                const filter = {
                    inventoryId: inventoryId,
                };
                const userId = findProduct._id;
                const result = await schemas_1.Product.findByIdAndUpdate(userId, filter, updateOptions);
                console.log(result);
            }
        }
        ;
        const getInventory = await axios_1.default.get(`http://localhost:3001/inventoris/find/${findProduct.inventoryId}`);
        console.log(getInventory);
        const { quantity } = getInventory.data.result;
        return res.status(200).json({ success: true, message: "successfull",
            findProduct,
            stock: quantity || 0,
            stockStatus: quantity ? 'in stock' : 'out of stock',
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.default = find;
//# sourceMappingURL=find.js.map