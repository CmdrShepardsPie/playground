var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk", "node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const node_logger_1 = require("node-logger");
    const log = node_logger_1.createLog("Adapter Helpers");
    var EventHandlers;
    (function (EventHandlers) {
        EventHandlers["Ready"] = "ready";
        EventHandlers["Close"] = "close";
        EventHandlers["Error"] = "error";
    })(EventHandlers = exports.EventHandlers || (exports.EventHandlers = {}));
    function setupAdapter(currentAdapter, eventHandlers) {
        log(chalk_1.default.cyan("Setup Adapter"));
        Object.entries(eventHandlers).forEach((entry) => {
            const name = entry[0];
            const handler = entry[1];
            currentAdapter.on(name, handler.bind(undefined, currentAdapter));
        });
        currentAdapter.open();
        return currentAdapter;
    }
    exports.setupAdapter = setupAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYWRhcHRlci1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQ0Esa0RBQTBCO0lBQzFCLDZDQUFzQztJQUV0QyxNQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFNekMsSUFBWSxhQUlYO0lBSkQsV0FBWSxhQUFhO1FBQ3ZCLGdDQUFlLENBQUE7UUFDZixnQ0FBZSxDQUFBO1FBQ2YsZ0NBQWUsQ0FBQTtJQUNqQixDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7SUFFRCxTQUFnQixZQUFZLENBQTBCLGNBQWlCLEVBQUUsYUFBZ0M7UUFDdkcsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBVEQsb0NBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NwZWVjaEFkYXB0ZXJ9IGZyb20gXCJAc2VydmljZXMvc3BlZWNoLWFkYXB0ZXJzL3NwZWVjaC5hZGFwdGVyXCI7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5pbXBvcnQge2NyZWF0ZUxvZ30gZnJvbSBcIm5vZGUtbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkFkYXB0ZXIgSGVscGVyc1wiKTtcblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRIYW5kbGVyczxUIGV4dGVuZHMgU3BlZWNoQWRhcHRlcj4ge1xuICBbbmFtZTogc3RyaW5nXTogKGFkYXB0ZXI6IFQsIC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59XG5cbmV4cG9ydCBlbnVtIEV2ZW50SGFuZGxlcnMge1xuICBSZWFkeSA9IFwicmVhZHlcIixcbiAgQ2xvc2UgPSBcImNsb3NlXCIsXG4gIEVycm9yID0gXCJlcnJvclwiLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBZGFwdGVyPFQgZXh0ZW5kcyBTcGVlY2hBZGFwdGVyPihjdXJyZW50QWRhcHRlcjogVCwgZXZlbnRIYW5kbGVyczogSUV2ZW50SGFuZGxlcnM8VD4pIHtcbiAgbG9nKGNoYWxrLmN5YW4oXCJTZXR1cCBBZGFwdGVyXCIpKTtcbiAgT2JqZWN0LmVudHJpZXMoZXZlbnRIYW5kbGVycykuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZW50cnlbMF07XG4gICAgY29uc3QgaGFuZGxlciA9IGVudHJ5WzFdO1xuICAgIGN1cnJlbnRBZGFwdGVyLm9uKG5hbWUsIGhhbmRsZXIuYmluZCh1bmRlZmluZWQsIGN1cnJlbnRBZGFwdGVyKSk7XG4gIH0pO1xuICBjdXJyZW50QWRhcHRlci5vcGVuKCk7XG4gIHJldHVybiBjdXJyZW50QWRhcHRlcjtcbn1cbiJdfQ==