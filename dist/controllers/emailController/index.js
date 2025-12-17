"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmailController = exports.sendEmailController = exports.emailHealth = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "emailHealth", { enumerable: true, get: function () { return __importDefault(health_1).default; } });
var sendEmailController_1 = require("./sendEmailController");
Object.defineProperty(exports, "sendEmailController", { enumerable: true, get: function () { return __importDefault(sendEmailController_1).default; } });
var findEmail_1 = require("./findEmail");
Object.defineProperty(exports, "findEmailController", { enumerable: true, get: function () { return __importDefault(findEmail_1).default; } });
//# sourceMappingURL=index.js.map