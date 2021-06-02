(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommandInput {
        subscriptions = [];
        use(input) {
            const subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
            this.subscriptions.push(subscriber);
            return subscriber;
        }
        clear() {
            while (this.subscriptions.length) {
                const sub = this.subscriptions.pop();
                sub && sub.unsubscribe();
            }
        }
        remove(subscription) {
            const index = this.subscriptions.indexOf(subscription);
            if (index > -1) {
                subscription.unsubscribe();
                this.subscriptions.splice(index, 1);
            }
        }
    }
    exports.default = CommandInput;
});
//# sourceMappingURL=command-input.js.map