"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = require("ioredis");
var redis = new ioredis_1.Redis({
    port: 18239,
    host: 'redis-18239.crce220.us-east-1-4.ec2.cloud.redislabs.com',
    password: 'FUUWA6JWHzU5jFL9GAekM2JR0wWfKsvg',
    username: "default",
    db: 0, // Defaults to 0
});
redis.on('error', function (err) { return console.log('Redis Client Error', err); });
exports.default = redis;
