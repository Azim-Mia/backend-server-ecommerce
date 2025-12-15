"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cookieParser = require('cookie-parser');
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var productRouter_1 = require("./src/routers/productRouter/productRouter");
var cartRouter_1 = require("./src/routers/cartRouter/cartRouter");
var emailRouter_1 = require("./src/routers/emailRouter/emailRouter");
var inventoryRouter_1 = require("./src/routers/inventoryRouter/inventoryRouter");
var userRouter_1 = require("./src/routers/userRouter/userRouter");
var authRouter_1 = require("./src/routers/authRouter/authRouter");
var orderRouter_1 = require("./src/routers/orderRouter/orderRouter");
var paymentRouter_1 = require("./src/routers/paymentRouter/paymentRouter");
var searchRouter_1 = require("./src/routers/searchRouter/searchRouter");
require("./events/sessionStore");
var app = (0, express_1.default)();
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
app.get('/', function (_req, res) {
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
app.use(function (req, res, next) {
    res.status(404).send("Not Found Route");
});
app.use(function (err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
exports.default = app;
