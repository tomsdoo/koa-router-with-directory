"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
exports.attachDirToRouter = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
function attachDirToRouter(router, provided_path) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (function readdirRecursively(dir, files) {
                        if (files === void 0) { files = []; }
                        return __awaiter(this, void 0, void 0, function () {
                            var dirents, dirs, _loop_1, _i, dirents_1, dirent, _a, dirs_1, d;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, fs.promises.readdir(dir, { withFileTypes: true })];
                                    case 1:
                                        dirents = _b.sent();
                                        dirs = [];
                                        _loop_1 = function (dirent) {
                                            var mypath = dir + "/" + dirent.name;
                                            [
                                                dirent.isDirectory() ? dirs : [],
                                                dirent.isFile() ? files : []
                                            ].forEach(function (arr) {
                                                arr.push(mypath);
                                            });
                                        };
                                        for (_i = 0, dirents_1 = dirents; _i < dirents_1.length; _i++) {
                                            dirent = dirents_1[_i];
                                            _loop_1(dirent);
                                        }
                                        _a = 0, dirs_1 = dirs;
                                        _b.label = 2;
                                    case 2:
                                        if (!(_a < dirs_1.length)) return [3 /*break*/, 5];
                                        d = dirs_1[_a];
                                        return [4 /*yield*/, readdirRecursively(d, files)];
                                    case 3:
                                        files = _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        _a++;
                                        return [3 /*break*/, 2];
                                    case 5: return [2 /*return*/, Promise.resolve(files)];
                                }
                            });
                        });
                    })(provided_path)];
                case 1:
                    files = _a.sent();
                    files
                        // .filter((file) => path.extname(file) === ".js")
                        .filter(function (file) { return path.basename(file) === "index.js"; })
                        .forEach(function (file) {
                        var f = path.relative(provided_path, file);
                        var tempm = require(file);
                        var mpath = ("/" + f.slice(0, f.lastIndexOf(path.sep) + 1)).replace(/_/g, ":");
                        var basename = path.basename(f, path.extname(f));
                        ["get", "post", "put", "delete"]
                            .map(function (method) {
                            for (var tempmethod in tempm) {
                                if (tempmethod.toUpperCase() === method.toUpperCase()) {
                                    return { method: method, functionname: tempmethod };
                                }
                            }
                            return { method: method, functionname: null };
                        })
                            .filter(function (mset) { return mset.functionname; })
                            .forEach(function (mset) {
                            // @ts-ignore
                            router[mset.method](("" + mpath + (basename === "index" ? "" : basename)).replace(/\\/g, "/"), tempm[mset.functionname]);
                        });
                    });
                    return [2 /*return*/, Promise.resolve(router)];
            }
        });
    });
}
exports.attachDirToRouter = attachDirToRouter;
;
exports.default = attachDirToRouter;
