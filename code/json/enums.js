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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./keycodes.json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Commands = void 0;
    var Commands;
    (function (Commands) {
        Commands[Commands["Question"] = 0] = "Question";
        Commands[Commands["Left"] = 1] = "Left";
        Commands[Commands["Right"] = 2] = "Right";
        Commands[Commands["Up"] = 3] = "Up";
        Commands[Commands["Down"] = 4] = "Down";
        Commands[Commands["ChannelUp"] = 5] = "ChannelUp";
        Commands[Commands["ChannelDown"] = 6] = "ChannelDown";
        Commands[Commands["LastChannel"] = 7] = "LastChannel";
        Commands[Commands["VolumeUp"] = 8] = "VolumeUp";
        Commands[Commands["VolumeDown"] = 9] = "VolumeDown";
        Commands[Commands["Safe"] = 10] = "Safe";
        Commands[Commands["Grid"] = 11] = "Grid";
        Commands[Commands["Player"] = 12] = "Player";
        Commands[Commands["Mute"] = 13] = "Mute";
        Commands[Commands["Menu"] = 14] = "Menu";
        Commands[Commands["Guide"] = 15] = "Guide";
        Commands[Commands["Options"] = 16] = "Options";
        Commands[Commands["Record"] = 17] = "Record";
        Commands[Commands["Info"] = 18] = "Info";
        Commands[Commands["Select"] = 19] = "Select";
        Commands[Commands["Back"] = 20] = "Back";
        Commands[Commands["Exit"] = 21] = "Exit";
        Commands[Commands["Reset"] = 22] = "Reset";
    })(Commands = exports.Commands || (exports.Commands = {}));
    const Keys = __importStar(require("./keycodes.json"));
    // "Invert" the key/val pair so we can do a reverse lookup
    Object.entries(Keys).forEach((entry) => {
        const key = entry[0].toString();
        const val = entry[1].toString();
        if (!Keys[val] || (typeof Keys[val] === "string" && Keys[val].length > key.length)) {
            Keys[val] = key;
        }
    });
});
//# sourceMappingURL=enums.js.map