(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var log = node_logger_1.createLog("Adapter Helpers");
    var EventHandlers;
    (function (EventHandlers) {
        EventHandlers["Ready"] = "ready";
        EventHandlers["Close"] = "close";
        EventHandlers["Error"] = "error";
    })(EventHandlers = exports.EventHandlers || (exports.EventHandlers = {}));
    function setupAdapter(currentAdapter, eventHandlers) {
        log(chalk_1.default.cyan("Setup Adapter"));
        Object.entries(eventHandlers).forEach(function (entry) {
            var name = entry[0];
            var handler = entry[1];
            currentAdapter.on(name, handler.bind(undefined, currentAdapter));
        });
        currentAdapter.open();
        return currentAdapter;
    }
    exports.setupAdapter = setupAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYWRhcHRlci1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkNBQXNDO0lBRXRDLCtCQUEwQjtJQUUxQixJQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFLekMsSUFBWSxhQUlYO0lBSkQsV0FBWSxhQUFhO1FBQ3ZCLGdDQUFlLENBQUE7UUFDZixnQ0FBZSxDQUFBO1FBQ2YsZ0NBQWUsQ0FBQTtJQUNqQixDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7SUFFRCxTQUFnQixZQUFZLENBQTBCLGNBQWlCLEVBQUUsYUFBZ0M7UUFDdkcsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDMUMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFURCxvQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcbmltcG9ydCB7SUFkYXB0ZXJDb25maWcsIFNwZWVjaEFkYXB0ZXJ9IGZyb20gXCJAc2VydmljZXMvc3BlZWNoLWFkYXB0ZXJzL3NwZWVjaC5hZGFwdGVyXCI7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkFkYXB0ZXIgSGVscGVyc1wiKTtcblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRIYW5kbGVyczxUIGV4dGVuZHMgU3BlZWNoQWRhcHRlcj4ge1xuICBbbmFtZTogc3RyaW5nXTogKGFkYXB0ZXI6IFQsIC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59XG5leHBvcnQgZW51bSBFdmVudEhhbmRsZXJzIHtcbiAgUmVhZHkgPSBcInJlYWR5XCIsXG4gIENsb3NlID0gXCJjbG9zZVwiLFxuICBFcnJvciA9IFwiZXJyb3JcIixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQWRhcHRlcjxUIGV4dGVuZHMgU3BlZWNoQWRhcHRlcj4oY3VycmVudEFkYXB0ZXI6IFQsIGV2ZW50SGFuZGxlcnM6IElFdmVudEhhbmRsZXJzPFQ+KSB7XG4gIGxvZyhjaGFsay5jeWFuKFwiU2V0dXAgQWRhcHRlclwiKSk7XG4gIE9iamVjdC5lbnRyaWVzKGV2ZW50SGFuZGxlcnMpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGVudHJ5WzBdO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBlbnRyeVsxXTtcbiAgICBjdXJyZW50QWRhcHRlci5vbihuYW1lLCBoYW5kbGVyLmJpbmQodW5kZWZpbmVkLCBjdXJyZW50QWRhcHRlcikpO1xuICB9KTtcbiAgY3VycmVudEFkYXB0ZXIub3BlbigpO1xuICByZXR1cm4gY3VycmVudEFkYXB0ZXI7XG59XG4iXX0=