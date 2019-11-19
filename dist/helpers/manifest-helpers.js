var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk", "fs-helpers", "node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const fs_helpers_1 = require("fs-helpers");
    const node_logger_1 = require("node-logger");
    const log = node_logger_1.createLog("Manifest Helpers");
    async function getManifest(path) {
        log(chalk_1.default.cyan("Get Manifest"), path);
        const manifestStr = await fs_helpers_1.readFileAsync(path, "utf8");
        return JSON.parse(manifestStr);
    }
    exports.getManifest = getManifest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaWZlc3QtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL21hbmlmZXN0LWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFDQSxrREFBMEI7SUFDMUIsMkNBQXlDO0lBQ3pDLDZDQUFzQztJQUV0QyxNQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFbkMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUFZO1FBQzVDLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLE1BQU0sMEJBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFKRCxrQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU1hbmlmZXN0fSBmcm9tIFwiQGludGVyZmFjZXMvaS5tYW5pZmVzdFwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IHtyZWFkRmlsZUFzeW5jfSBmcm9tIFwiZnMtaGVscGVyc1wiO1xuaW1wb3J0IHtjcmVhdGVMb2d9IGZyb20gXCJub2RlLWxvZ2dlclwiO1xuXG5jb25zdCBsb2cgPSBjcmVhdGVMb2coXCJNYW5pZmVzdCBIZWxwZXJzXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWFuaWZlc3QocGF0aDogc3RyaW5nKTogUHJvbWlzZTxJTWFuaWZlc3RbXT4ge1xuICBsb2coY2hhbGsuY3lhbihcIkdldCBNYW5pZmVzdFwiKSwgcGF0aCk7XG4gIGNvbnN0IG1hbmlmZXN0U3RyID0gYXdhaXQgcmVhZEZpbGVBc3luYyhwYXRoLCBcInV0ZjhcIik7XG4gIHJldHVybiBKU09OLnBhcnNlKG1hbmlmZXN0U3RyKTtcbn1cbiJdfQ==