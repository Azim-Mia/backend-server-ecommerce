"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Find = exports.Finds = exports.Create = exports.Health = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "Health", { enumerable: true, get: function () { return __importDefault(health_1).default; } });
var create_1 = require("./create");
Object.defineProperty(exports, "Create", { enumerable: true, get: function () { return __importDefault(create_1).default; } });
var finds_1 = require("./finds");
Object.defineProperty(exports, "Finds", { enumerable: true, get: function () { return __importDefault(finds_1).default; } });
var find_1 = require("./find");
Object.defineProperty(exports, "Find", { enumerable: true, get: function () { return __importDefault(find_1).default; } });
var delete_1 = require("./delete");
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return __importDefault(delete_1).default; } });
//# sourceMappingURL=index.js.map