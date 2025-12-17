"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookieParser = require('cookie-parser');
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const productRouter_1 = __importDefault(require("./routers/productRouter/productRouter"));
const cartRouter_1 = __importDefault(require("./routers/cartRouter/cartRouter"));
const emailRouter_1 = __importDefault(require("./routers/emailRouter/emailRouter"));
const inventoryRouter_1 = __importDefault(require("./routers/inventoryRouter/inventoryRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter/authRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter/orderRouter"));
const paymentRouter_1 = require("./routers/paymentRouter/paymentRouter");
const searchRouter_1 = __importDefault(require("./routers/searchRouter/searchRouter"));
require("./events/sessionStore");
const app = (0, express_1.default)();
app.use(cookieParser());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:8158", "http://localhost:3001", "http://localhost:3002"],
    methods: ["PUT", "POST", "GET", "UPDATE"],
    credentials: true,
}));
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'health success'
    });
});
app.use('/products', productRouter_1.default);
app.use('/carts', cartRouter_1.default);
app.use('/email', emailRouter_1.default);
app.use('/inventoris', inventoryRouter_1.default);
app.use('/profile', userRouter_1.default);
app.use('/auth', authRouter_1.default);
app.use('/orders', orderRouter_1.default);
app.use('/payment', paymentRouter_1.paymentRouter);
app.use('/', searchRouter_1.default);
app.use((req, res, next) => {
    res.status(404).send("Not Found Route");
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map