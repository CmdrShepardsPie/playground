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
    var CommandInput = /** @class */ (function () {
        function CommandInput() {
            this.subscriptions = [];
        }
        CommandInput.prototype.use = function (input) {
            var subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
            this.subscriptions.push(subscriber);
            return subscriber;
        };
        CommandInput.prototype.clear = function () {
            while (this.subscriptions.length) {
                var sub = this.subscriptions.pop();
                sub && sub.unsubscribe();
            }
        };
        CommandInput.prototype.remove = function (subscription) {
            var index = this.subscriptions.indexOf(subscription);
            if (index > -1) {
                subscription.unsubscribe();
                this.subscriptions.splice(index, 1);
            }
        };
        return CommandInput;
    }());
    exports.default = CommandInput;
});
