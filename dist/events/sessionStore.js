"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const clearCard_1 = __importDefault(require("../servises/clearCard"));
const redis = new ioredis_1.Redis({
    port: 18239,
    host: 'redis-18239.crce220.us-east-1-4.ec2.cloud.redislabs.com',
    password: 'FUUWA6JWHzU5jFL9GAekM2JR0wWfKsvg',
    username: "default",
    db: 0, // Defaults to 0
});
const CHENAL_KEY = '__keyevent@0__:expired';
redis.config('SET', 'notify-keyspace-events', 'Ex');
redis.subscribe(CHENAL_KEY);
redis.on('message', async (ch, message) => {
    if (ch == CHENAL_KEY) {
        console.log('expired key : ' + message);
        const cardKey = message.split(":").pop();
        if (!cardKey)
            return;
        (0, clearCard_1.default)(cardKey);
    }
});
/*this file use root file app */ 
//# sourceMappingURL=sessionStore.js.map