"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./config/db");
var app_1 = require("./app");
require('dotenv').config();
var server_port = process.env.SERVER_PORT || 3001;
app_1.default.listen(server_port, function () {
    try {
        console.log("http://localhost:".concat(server_port));
        (0, db_1.default)();
    }
    catch (err) {
        console.log(err);
    }
});
