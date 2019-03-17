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
    exports.__esModule = true;
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
    exports["default"] = CommandInput;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hYnN0cmFjdC9jb21tYW5kLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBSUE7UUFBQTtZQUNZLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXdCL0MsQ0FBQztRQXRCUSwwQkFBRyxHQUFWLFVBQVcsS0FBNkI7WUFDdEMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFFTSw0QkFBSyxHQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUM7UUFFTSw2QkFBTSxHQUFiLFVBQWMsWUFBMEI7WUFDdEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDO1FBR0gsbUJBQUM7SUFBRCxDQUFDLEFBekJELElBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5pbXBvcnQgSUNvbW1hbmRJbnB1dCBmcm9tIFwiLi9pLmNvbW1hbmQtaW5wdXRcIjtcbmltcG9ydCBJQ29tbWFuZE91dHB1dCBmcm9tIFwiLi9pLmNvbW1hbmQtb3V0cHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbW1hbmRJbnB1dDxJblR5cGU+IGltcGxlbWVudHMgSUNvbW1hbmRJbnB1dDxJblR5cGU+IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHVibGljIHVzZShpbnB1dDogSUNvbW1hbmRPdXRwdXQ8SW5UeXBlPikge1xuICAgIGNvbnN0IHN1YnNjcmliZXIgPSBpbnB1dC5vdXRwdXQuc3Vic2NyaWJlKHRoaXMubGlzdGVuICYmIHRoaXMubGlzdGVuLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmliZXIpO1xuICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHdoaWxlICh0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLnN1YnNjcmlwdGlvbnMucG9wKCk7XG4gICAgICBzdWIgJiYgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZShzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbGlzdGVuKHZhbHVlOiBJblR5cGUpOiB2b2lkO1xufVxuIl19