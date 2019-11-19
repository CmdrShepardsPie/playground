// tslint:disable:max-classes-per-file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const Subject_1 = require("rxjs/Subject");
    const command_input_1 = __importDefault(require("./command-input"));
    const command_output_1 = __importDefault(require("./command-output"));
    class CommandLink {
        constructor() {
            this.subject = new Subject_1.Subject();
            this.commandInput = new CommandInputed(this.listen.bind(this));
            this.commandOutput = new CommandOutputed(this.subject);
        }
        get output() {
            return this.commandOutput.output;
        }
        use(input) {
            return this.commandInput.use(input);
        }
        remove(subscription) {
            return this.commandInput.remove(subscription);
        }
        clear() {
            return this.commandInput.clear();
        }
        emit(value) {
            this.subject && this.subject.next(value);
        }
    }
    exports.default = CommandLink;
    // Make a concrete version of CommandInput to be instantiated in CommandLink above
    class CommandInputed extends command_input_1.default {
        constructor(listener) {
            super();
            this.listener = listener;
        }
        listen(value) {
            this.listener && this.listener(value);
        }
    }
    // Make a concrete version of CommandOutput to be instantiated in CommandLink above
    class CommandOutputed extends command_output_1.default {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1saW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2Fic3RyYWN0L2NvbW1hbmQtbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7Ozs7Ozs7Ozs7Ozs7OztJQUd0QywwQ0FBcUM7SUFFckMsb0VBQTJDO0lBQzNDLHNFQUE2QztJQUk3QyxNQUE4QixXQUFXO1FBQXpDO1lBQ1ksWUFBTyxHQUFxQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUMxQyxpQkFBWSxHQUFHLElBQUksY0FBYyxDQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEUsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUF1QnZFLENBQUM7UUFyQkMsSUFBVyxNQUFNO1lBQ2YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxDQUFDO1FBRU0sR0FBRyxDQUFDLEtBQTZCO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVNLE1BQU0sQ0FBQyxZQUEwQjtZQUN0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFTSxLQUFLO1lBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFUyxJQUFJLENBQUMsS0FBYztZQUMzQixJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FHRjtJQTFCRCw4QkEwQkM7SUFFRCxrRkFBa0Y7SUFDbEYsTUFBTSxjQUF1QixTQUFRLHVCQUFvQjtRQUN2RCxZQUFvQixRQUFpQztZQUNuRCxLQUFLLEVBQUUsQ0FBQztZQURVLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBRXJELENBQUM7UUFFUyxNQUFNLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUNGO0lBRUQsbUZBQW1GO0lBQ25GLE1BQU0sZUFBeUIsU0FBUSx3QkFBc0I7S0FDNUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IENvbW1hbmRJbnB1dCBmcm9tIFwiLi9jb21tYW5kLWlucHV0XCI7XG5pbXBvcnQgQ29tbWFuZE91dHB1dCBmcm9tIFwiLi9jb21tYW5kLW91dHB1dFwiO1xuaW1wb3J0IElDb21tYW5kTGluayBmcm9tIFwiLi9pLmNvbW1hbmQtbGlua1wiO1xuaW1wb3J0IElDb21tYW5kT3V0cHV0IGZyb20gXCIuL2kuY29tbWFuZC1vdXRwdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ29tbWFuZExpbms8SW5UeXBlLCBPdXRUeXBlID0gSW5UeXBlPiBpbXBsZW1lbnRzIElDb21tYW5kTGluazxJblR5cGUsIE91dFR5cGU+IHtcbiAgcHJvdGVjdGVkIHN1YmplY3Q6IFN1YmplY3Q8T3V0VHlwZT4gPSBuZXcgU3ViamVjdCgpO1xuICBwcm90ZWN0ZWQgY29tbWFuZElucHV0ID0gbmV3IENvbW1hbmRJbnB1dGVkPEluVHlwZT4odGhpcy5saXN0ZW4uYmluZCh0aGlzKSk7XG4gIHByb3RlY3RlZCBjb21tYW5kT3V0cHV0ID0gbmV3IENvbW1hbmRPdXRwdXRlZDxPdXRUeXBlPih0aGlzLnN1YmplY3QpO1xuXG4gIHB1YmxpYyBnZXQgb3V0cHV0KCk6IE9ic2VydmFibGU8T3V0VHlwZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmRPdXRwdXQub3V0cHV0O1xuICB9XG5cbiAgcHVibGljIHVzZShpbnB1dDogSUNvbW1hbmRPdXRwdXQ8SW5UeXBlPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZElucHV0LnVzZShpbnB1dCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZElucHV0LnJlbW92ZShzdWJzY3JpcHRpb24pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmRJbnB1dC5jbGVhcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXQodmFsdWU6IE91dFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnN1YmplY3QgJiYgdGhpcy5zdWJqZWN0Lm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGxpc3Rlbih2YWx1ZTogSW5UeXBlKTogdm9pZDtcbn1cblxuLy8gTWFrZSBhIGNvbmNyZXRlIHZlcnNpb24gb2YgQ29tbWFuZElucHV0IHRvIGJlIGluc3RhbnRpYXRlZCBpbiBDb21tYW5kTGluayBhYm92ZVxuY2xhc3MgQ29tbWFuZElucHV0ZWQ8SW5UeXBlPiBleHRlbmRzIENvbW1hbmRJbnB1dDxJblR5cGU+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaXN0ZW5lcjogKHZhbHVlOiBJblR5cGUpID0+IHZvaWQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxpc3Rlbih2YWx1ZTogSW5UeXBlKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lciAmJiB0aGlzLmxpc3RlbmVyKHZhbHVlKTtcbiAgfVxufVxuXG4vLyBNYWtlIGEgY29uY3JldGUgdmVyc2lvbiBvZiBDb21tYW5kT3V0cHV0IHRvIGJlIGluc3RhbnRpYXRlZCBpbiBDb21tYW5kTGluayBhYm92ZVxuY2xhc3MgQ29tbWFuZE91dHB1dGVkPE91dFR5cGU+IGV4dGVuZHMgQ29tbWFuZE91dHB1dDxPdXRUeXBlPiB7XG59XG4iXX0=