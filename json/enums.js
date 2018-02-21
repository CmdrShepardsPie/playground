(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/Subject", "./keycodes.json", "rxjs/add/operator/share"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Subject_1 = require("rxjs/Subject");
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
    const Keys = require("./keycodes.json");
    exports.Keys = Keys;
    // "Invert" the key/val pair so we can do a reverse lookup
    Object.entries(Keys).forEach(entry => {
        const key = entry[0].toString();
        const val = entry[1].toString();
        if (!Keys[val] || (typeof Keys[val] === 'string' && Keys[val].length > key.length)) {
            Keys[val] = key;
        }
    });
    require("rxjs/add/operator/share");
    class CommandChain {
        constructor() {
            this.subscribers = [];
            this.subject = new Subject_1.Subject();
            this.observable = this.subject.share();
        }
        get output() {
            return this.observable;
        }
        use(input) {
            const subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
            this.subscribers.push(subscriber);
            return subscriber;
        }
        clear() {
            while (this.subscribers.length) {
                const sub = this.subscribers.pop();
                sub && sub.unsubscribe();
            }
        }
        remove(subscriber) {
            const index = this.subscribers.indexOf(subscriber);
            if (index > -1) {
                subscriber.unsubscribe();
                this.subscribers.splice(index, 1);
            }
        }
        emit(value) {
            this.subject.next(value);
        }
    }
    exports.CommandChain = CommandChain;
});
//# sourceMappingURL=enums.js.map