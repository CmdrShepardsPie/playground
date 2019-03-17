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
    exports.__esModule = true;
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
    var Keys = require("./keycodes.json");
    // "Invert" the key/val pair so we can do a reverse lookup
    Object.entries(Keys).forEach(function (entry) {
        var key = entry[0].toString();
        var val = entry[1].toString();
        if (!Keys[val] || (typeof Keys[val] === "string" && Keys[val].length > key.length)) {
            Keys[val] = key;
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanNvbi9lbnVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLElBQVksUUF3Qlg7SUF4QkQsV0FBWSxRQUFRO1FBQ2xCLCtDQUFRLENBQUE7UUFDUix1Q0FBSSxDQUFBO1FBQ0oseUNBQUssQ0FBQTtRQUNMLG1DQUFFLENBQUE7UUFDRix1Q0FBSSxDQUFBO1FBQ0osaURBQVMsQ0FBQTtRQUNULHFEQUFXLENBQUE7UUFDWCxxREFBVyxDQUFBO1FBQ1gsK0NBQVEsQ0FBQTtRQUNSLG1EQUFVLENBQUE7UUFDVix3Q0FBSSxDQUFBO1FBQ0osd0NBQUksQ0FBQTtRQUNKLDRDQUFNLENBQUE7UUFDTix3Q0FBSSxDQUFBO1FBQ0osd0NBQUksQ0FBQTtRQUNKLDBDQUFLLENBQUE7UUFDTCw4Q0FBTyxDQUFBO1FBQ1AsNENBQU0sQ0FBQTtRQUNOLHdDQUFJLENBQUE7UUFDSiw0Q0FBTSxDQUFBO1FBQ04sd0NBQUksQ0FBQTtRQUNKLHdDQUFJLENBQUE7UUFDSiwwQ0FBSyxDQUFBO0lBQ1AsQ0FBQyxFQXhCVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQXdCbkI7SUFHRCxzQ0FBd0M7SUFDeEMsMERBQTBEO0lBQzFELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztRQUNqQyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNqQjtJQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQ29tbWFuZHMge1xuICBRdWVzdGlvbixcbiAgTGVmdCxcbiAgUmlnaHQsXG4gIFVwLFxuICBEb3duLFxuICBDaGFubmVsVXAsXG4gIENoYW5uZWxEb3duLFxuICBMYXN0Q2hhbm5lbCxcbiAgVm9sdW1lVXAsXG4gIFZvbHVtZURvd24sXG4gIFNhZmUsXG4gIEdyaWQsXG4gIFBsYXllcixcbiAgTXV0ZSxcbiAgTWVudSxcbiAgR3VpZGUsXG4gIE9wdGlvbnMsXG4gIFJlY29yZCxcbiAgSW5mbyxcbiAgU2VsZWN0LFxuICBCYWNrLFxuICBFeGl0LFxuICBSZXNldCxcbn1cblxudHlwZSBLZXlzID0gbnVtYmVyO1xuaW1wb3J0ICogYXMgS2V5cyBmcm9tIFwiLi9rZXljb2Rlcy5qc29uXCI7XG4vLyBcIkludmVydFwiIHRoZSBrZXkvdmFsIHBhaXIgc28gd2UgY2FuIGRvIGEgcmV2ZXJzZSBsb29rdXBcbk9iamVjdC5lbnRyaWVzKEtleXMpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gIGNvbnN0IGtleSA9IGVudHJ5WzBdLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHZhbCA9IGVudHJ5WzFdLnRvU3RyaW5nKCk7XG4gIGlmICghS2V5c1t2YWxdIHx8ICh0eXBlb2YgS2V5c1t2YWxdID09PSBcInN0cmluZ1wiICYmIEtleXNbdmFsXS5sZW5ndGggPiBrZXkubGVuZ3RoKSkge1xuICAgIEtleXNbdmFsXSA9IGtleTtcbiAgfVxufSk7XG5leHBvcnQgeyBLZXlzIH07XG4iXX0=