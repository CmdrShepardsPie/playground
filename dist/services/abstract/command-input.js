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
        constructor() {
            this.subscriptions = [];
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hYnN0cmFjdC9jb21tYW5kLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBSUEsTUFBOEIsWUFBWTtRQUExQztZQUNZLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXdCL0MsQ0FBQztRQXRCUSxHQUFHLENBQUMsS0FBNkI7WUFDdEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFFTSxLQUFLO1lBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUM7UUFFTSxNQUFNLENBQUMsWUFBMEI7WUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDO0tBR0Y7SUF6QkQsK0JBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IElDb21tYW5kSW5wdXQgZnJvbSBcIi4vaS5jb21tYW5kLWlucHV0XCI7XG5pbXBvcnQgSUNvbW1hbmRPdXRwdXQgZnJvbSBcIi4vaS5jb21tYW5kLW91dHB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21tYW5kSW5wdXQ8SW5UeXBlPiBpbXBsZW1lbnRzIElDb21tYW5kSW5wdXQ8SW5UeXBlPiB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHB1YmxpYyB1c2UoaW5wdXQ6IElDb21tYW5kT3V0cHV0PEluVHlwZT4pIHtcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gaW5wdXQub3V0cHV0LnN1YnNjcmliZSh0aGlzLmxpc3RlbiAmJiB0aGlzLmxpc3Rlbi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB3aGlsZSAodGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3ViID0gdGhpcy5zdWJzY3JpcHRpb25zLnBvcCgpO1xuICAgICAgc3ViICYmIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmUoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGxpc3Rlbih2YWx1ZTogSW5UeXBlKTogdm9pZDtcbn1cbiJdfQ==