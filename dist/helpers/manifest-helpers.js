var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs-helpers", "node-logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_helpers_1 = require("fs-helpers");
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var log = node_logger_1.createLog("Manifest Helpers");
    function getManifest(path) {
        return __awaiter(this, void 0, void 0, function () {
            var manifestStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log(chalk_1.default.cyan("Get Manifest"), path);
                        return [4 /*yield*/, fs_helpers_1.readFileAsync(path, "utf8")];
                    case 1:
                        manifestStr = _a.sent();
                        return [2 /*return*/, JSON.parse(manifestStr)];
                }
            });
        });
    }
    exports.getManifest = getManifest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaWZlc3QtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL21hbmlmZXN0LWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHlDQUF5QztJQUN6QywyQ0FBc0M7SUFFdEMsK0JBQTBCO0lBRTFCLElBQU0sR0FBRyxHQUFHLHVCQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUUxQyxTQUFzQixXQUFXLENBQUMsSUFBWTs7Ozs7O3dCQUM1QyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbEIscUJBQU0sMEJBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUEvQyxXQUFXLEdBQUcsU0FBaUM7d0JBQ3JELHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUM7Ozs7S0FDaEM7SUFKRCxrQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVhZEZpbGVBc3luY30gZnJvbSBcImZzLWhlbHBlcnNcIjtcbmltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcbmltcG9ydCB7SU1hbmlmZXN0fSBmcm9tIFwiQGludGVyZmFjZXMvaS5tYW5pZmVzdFwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5jb25zdCBsb2cgPSBjcmVhdGVMb2coXCJNYW5pZmVzdCBIZWxwZXJzXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWFuaWZlc3QocGF0aDogc3RyaW5nKTogUHJvbWlzZTxJTWFuaWZlc3RbXT4ge1xuICBsb2coY2hhbGsuY3lhbihcIkdldCBNYW5pZmVzdFwiKSwgcGF0aCk7XG4gIGNvbnN0IG1hbmlmZXN0U3RyID0gYXdhaXQgcmVhZEZpbGVBc3luYyhwYXRoLCBcInV0ZjhcIik7XG4gIHJldHVybiBKU09OLnBhcnNlKG1hbmlmZXN0U3RyKTtcbn1cbiJdfQ==