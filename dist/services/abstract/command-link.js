// tslint:disable:max-classes-per-file
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/Subject", "./command-input", "./command-output"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Subject_1 = require("rxjs/Subject");
    var command_input_1 = require("./command-input");
    var command_output_1 = require("./command-output");
    var CommandLink = /** @class */ (function () {
        function CommandLink() {
            this.subject = new Subject_1.Subject();
            this.commandInput = new CommandInputed(this.listen.bind(this));
            this.commandOutput = new CommandOutputed(this.subject);
        }
        Object.defineProperty(CommandLink.prototype, "output", {
            get: function () {
                return this.commandOutput.output;
            },
            enumerable: true,
            configurable: true
        });
        CommandLink.prototype.use = function (input) {
            return this.commandInput.use(input);
        };
        CommandLink.prototype.remove = function (subscription) {
            return this.commandInput.remove(subscription);
        };
        CommandLink.prototype.clear = function () {
            return this.commandInput.clear();
        };
        CommandLink.prototype.emit = function (value) {
            this.subject && this.subject.next(value);
        };
        return CommandLink;
    }());
    exports["default"] = CommandLink;
    // Make a concrete version of CommandInput to be instantiated in CommandLink above
    var CommandInputed = /** @class */ (function (_super) {
        __extends(CommandInputed, _super);
        function CommandInputed(listener) {
            var _this = _super.call(this) || this;
            _this.listener = listener;
            return _this;
        }
        CommandInputed.prototype.listen = function (value) {
            this.listener && this.listener(value);
        };
        return CommandInputed;
    }(command_input_1["default"]));
    // Make a concrete version of CommandOutput to be instantiated in CommandLink above
    var CommandOutputed = /** @class */ (function (_super) {
        __extends(CommandOutputed, _super);
        function CommandOutputed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CommandOutputed;
    }(command_output_1["default"]));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1saW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2Fic3RyYWN0L2NvbW1hbmQtbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHdEMsd0NBQXVDO0lBRXZDLGlEQUEyQztJQUMzQyxtREFBNkM7SUFJN0M7UUFBQTtZQUNZLFlBQU8sR0FBcUIsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDMUMsaUJBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBdUJ2RSxDQUFDO1FBckJDLHNCQUFXLCtCQUFNO2lCQUFqQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ25DLENBQUM7OztXQUFBO1FBRU0seUJBQUcsR0FBVixVQUFXLEtBQTZCO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVNLDRCQUFNLEdBQWIsVUFBYyxZQUEwQjtZQUN0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFTSwyQkFBSyxHQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFUywwQkFBSSxHQUFkLFVBQWUsS0FBYztZQUMzQixJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFHSCxrQkFBQztJQUFELENBQUMsQUExQkQsSUEwQkM7O0lBRUQsa0ZBQWtGO0lBQ2xGO1FBQXFDLGtDQUFvQjtRQUN2RCx3QkFBb0IsUUFBaUM7WUFBckQsWUFDRSxpQkFBTyxTQUNSO1lBRm1CLGNBQVEsR0FBUixRQUFRLENBQXlCOztRQUVyRCxDQUFDO1FBQ1MsK0JBQU0sR0FBaEIsVUFBaUIsS0FBYTtZQUM1QixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNILHFCQUFDO0lBQUQsQ0FBQyxBQVBELENBQXFDLDBCQUFZLEdBT2hEO0lBRUQsbUZBQW1GO0lBQ25GO1FBQXVDLG1DQUFzQjtRQUE3RDs7UUFBK0QsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0FBQyxBQUFoRSxDQUF1QywyQkFBYSxHQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqcy9TdWJzY3JpcHRpb25cIjtcbmltcG9ydCBDb21tYW5kSW5wdXQgZnJvbSBcIi4vY29tbWFuZC1pbnB1dFwiO1xuaW1wb3J0IENvbW1hbmRPdXRwdXQgZnJvbSBcIi4vY29tbWFuZC1vdXRwdXRcIjtcbmltcG9ydCBJQ29tbWFuZExpbmsgZnJvbSBcIi4vaS5jb21tYW5kLWxpbmtcIjtcbmltcG9ydCBJQ29tbWFuZE91dHB1dCBmcm9tIFwiLi9pLmNvbW1hbmQtb3V0cHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbW1hbmRMaW5rPEluVHlwZSwgT3V0VHlwZSA9IEluVHlwZT4gaW1wbGVtZW50cyBJQ29tbWFuZExpbms8SW5UeXBlLCBPdXRUeXBlPiB7XG4gIHByb3RlY3RlZCBzdWJqZWN0OiBTdWJqZWN0PE91dFR5cGU+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJvdGVjdGVkIGNvbW1hbmRJbnB1dCA9IG5ldyBDb21tYW5kSW5wdXRlZDxJblR5cGU+KHRoaXMubGlzdGVuLmJpbmQodGhpcykpO1xuICBwcm90ZWN0ZWQgY29tbWFuZE91dHB1dCA9IG5ldyBDb21tYW5kT3V0cHV0ZWQ8T3V0VHlwZT4odGhpcy5zdWJqZWN0KTtcblxuICBwdWJsaWMgZ2V0IG91dHB1dCgpOiBPYnNlcnZhYmxlPE91dFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kT3V0cHV0Lm91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyB1c2UoaW5wdXQ6IElDb21tYW5kT3V0cHV0PEluVHlwZT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmRJbnB1dC51c2UoaW5wdXQpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZShzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmRJbnB1dC5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kSW5wdXQuY2xlYXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0KHZhbHVlOiBPdXRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5zdWJqZWN0ICYmIHRoaXMuc3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBsaXN0ZW4odmFsdWU6IEluVHlwZSk6IHZvaWQ7XG59XG5cbi8vIE1ha2UgYSBjb25jcmV0ZSB2ZXJzaW9uIG9mIENvbW1hbmRJbnB1dCB0byBiZSBpbnN0YW50aWF0ZWQgaW4gQ29tbWFuZExpbmsgYWJvdmVcbmNsYXNzIENvbW1hbmRJbnB1dGVkPEluVHlwZT4gZXh0ZW5kcyBDb21tYW5kSW5wdXQ8SW5UeXBlPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGlzdGVuZXI6ICh2YWx1ZTogSW5UeXBlKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBwcm90ZWN0ZWQgbGlzdGVuKHZhbHVlOiBJblR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVyICYmIHRoaXMubGlzdGVuZXIodmFsdWUpO1xuICB9XG59XG5cbi8vIE1ha2UgYSBjb25jcmV0ZSB2ZXJzaW9uIG9mIENvbW1hbmRPdXRwdXQgdG8gYmUgaW5zdGFudGlhdGVkIGluIENvbW1hbmRMaW5rIGFib3ZlXG5jbGFzcyBDb21tYW5kT3V0cHV0ZWQ8T3V0VHlwZT4gZXh0ZW5kcyBDb21tYW5kT3V0cHV0PE91dFR5cGU+IHt9XG4iXX0=