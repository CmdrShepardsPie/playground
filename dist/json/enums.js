var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanNvbi9lbnVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxJQUFZLFFBd0JYO0lBeEJELFdBQVksUUFBUTtRQUNsQiwrQ0FBUSxDQUFBO1FBQ1IsdUNBQUksQ0FBQTtRQUNKLHlDQUFLLENBQUE7UUFDTCxtQ0FBRSxDQUFBO1FBQ0YsdUNBQUksQ0FBQTtRQUNKLGlEQUFTLENBQUE7UUFDVCxxREFBVyxDQUFBO1FBQ1gscURBQVcsQ0FBQTtRQUNYLCtDQUFRLENBQUE7UUFDUixtREFBVSxDQUFBO1FBQ1Ysd0NBQUksQ0FBQTtRQUNKLHdDQUFJLENBQUE7UUFDSiw0Q0FBTSxDQUFBO1FBQ04sd0NBQUksQ0FBQTtRQUNKLHdDQUFJLENBQUE7UUFDSiwwQ0FBSyxDQUFBO1FBQ0wsOENBQU8sQ0FBQTtRQUNQLDRDQUFNLENBQUE7UUFDTix3Q0FBSSxDQUFBO1FBQ0osNENBQU0sQ0FBQTtRQUNOLHdDQUFJLENBQUE7UUFDSix3Q0FBSSxDQUFBO1FBQ0osMENBQUssQ0FBQTtJQUNQLENBQUMsRUF4QlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUF3Qm5CO0lBR0Qsc0RBQXdDO0lBQ3hDLDBEQUEwRDtJQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsRixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBDb21tYW5kcyB7XG4gIFF1ZXN0aW9uLFxuICBMZWZ0LFxuICBSaWdodCxcbiAgVXAsXG4gIERvd24sXG4gIENoYW5uZWxVcCxcbiAgQ2hhbm5lbERvd24sXG4gIExhc3RDaGFubmVsLFxuICBWb2x1bWVVcCxcbiAgVm9sdW1lRG93bixcbiAgU2FmZSxcbiAgR3JpZCxcbiAgUGxheWVyLFxuICBNdXRlLFxuICBNZW51LFxuICBHdWlkZSxcbiAgT3B0aW9ucyxcbiAgUmVjb3JkLFxuICBJbmZvLFxuICBTZWxlY3QsXG4gIEJhY2ssXG4gIEV4aXQsXG4gIFJlc2V0LFxufVxuXG50eXBlIEtleXMgPSBudW1iZXI7XG5pbXBvcnQgKiBhcyBLZXlzIGZyb20gXCIuL2tleWNvZGVzLmpzb25cIjtcbi8vIFwiSW52ZXJ0XCIgdGhlIGtleS92YWwgcGFpciBzbyB3ZSBjYW4gZG8gYSByZXZlcnNlIGxvb2t1cFxuT2JqZWN0LmVudHJpZXMoS2V5cykuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgY29uc3Qga2V5ID0gZW50cnlbMF0udG9TdHJpbmcoKTtcbiAgY29uc3QgdmFsID0gZW50cnlbMV0udG9TdHJpbmcoKTtcbiAgaWYgKCFLZXlzW3ZhbF0gfHwgKHR5cGVvZiBLZXlzW3ZhbF0gPT09IFwic3RyaW5nXCIgJiYgS2V5c1t2YWxdLmxlbmd0aCA+IGtleS5sZW5ndGgpKSB7XG4gICAgS2V5c1t2YWxdID0ga2V5O1xuICB9XG59KTtcbmV4cG9ydCB7S2V5c307XG4iXX0=