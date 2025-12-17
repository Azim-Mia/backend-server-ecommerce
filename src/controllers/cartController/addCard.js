"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid').v4;
var axios_1 = require("axios");
var rdConfig_1 = require("../../config/rdConfig");
var zodSchema_1 = require("./zodSchema");
var makeCookie_1 = require("../../servises/makeCookie");
var secret_1 = require("../../secret");
var addCard = function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var parseBody, cardSessionId, exists, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                parseBody = zodSchema_1.addCardSchema.safeParse(req.body);
                if (!parseBody.success) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: parseBody.error.errors })];
                }
                cardSessionId = req.headers['x-card-session-id'] || null;
                console.log("Backend Cart add " + cardSessionId);
                if (!cardSessionId) return [3 /*break*/, 2];
                return [4 /*yield*/, rdConfig_1.default.exists("sessions:".concat(cardSessionId))];
            case 1:
                exists = _a.sent();
                console.log("sessionId is exists :" + exists);
                if (!exists) {
                    cardSessionId = null;
                }
                _a.label = 2;
            case 2:
                ;
                if (!!cardSessionId) return [3 /*break*/, 4];
                cardSessionId = uuidv4();
                return [4 /*yield*/, rdConfig_1.default.setex("sessions:".concat(cardSessionId), secret_1.ttl, cardSessionId)];
            case 3:
                _a.sent();
                res.setHeader("x-card-session-id", cardSessionId);
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, makeCookie_1.createCartSessionCookie)(res, cardSessionId)
                //check the inventory abilable
            ];
            case 5:
                _a.sent();
                return [4 /*yield*/, axios_1.default.get("http://localhost:3001/inventoris/find/".concat(parseBody.data.inventoryId))];
            case 6:
                data = (_a.sent()).data;
                if (data.success == false) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Inventory ID Not Match.." })];
                }
                if (data.result.quantity < Number(parseBody.data.quantity) || Number(parseBody.data.quantity) < 1) {
                    return [2 /*return*/, res.status(202).json({ success: false, message: "quantity is not ableable" })];
                }
                ;
                //update inventory 
                return [4 /*yield*/, axios_1.default.put("http://localhost:3001/inventoris/update/".concat(parseBody.data.inventoryId), {
                        quantity: Number(parseBody.data.quantity),
                        actionType: "OUT"
                    })];
            case 7:
                //update inventory 
                _a.sent();
                //add item to the card
                //if product exists 
                // lgic parseBody.data.quantity - existing quantity
                return [4 /*yield*/, rdConfig_1.default.hset("card:".concat(cardSessionId), parseBody.data.productId, JSON.stringify({
                        inventoryId: parseBody.data.inventoryId,
                        quantity: Number(parseBody.data.quantity),
                        color: parseBody.data.color,
                        size: parseBody.data.size || '',
                    }))];
            case 8:
                //add item to the card
                //if product exists 
                // lgic parseBody.data.quantity - existing quantity
                _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: "add to card successfull", sessionId: cardSessionId })];
            case 9:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error add-to-card' })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.default = addCard;
