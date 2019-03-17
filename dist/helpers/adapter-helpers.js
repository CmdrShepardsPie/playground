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
    exports.__esModule = true;
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
        log(chalk_1["default"].cyan("Setup Adapter"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYWRhcHRlci1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkNBQXNDO0lBRXRDLCtCQUEwQjtJQUUxQixJQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFLekMsSUFBWSxhQUlYO0lBSkQsV0FBWSxhQUFhO1FBQ3ZCLGdDQUFlLENBQUE7UUFDZixnQ0FBZSxDQUFBO1FBQ2YsZ0NBQWUsQ0FBQTtJQUNqQixDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7SUFFRCxTQUFnQixZQUFZLENBQTBCLGNBQWlCLEVBQUUsYUFBZ0M7UUFDdkcsR0FBRyxDQUFDLGtCQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzFDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBVEQsb0NBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZUxvZ30gZnJvbSBcIm5vZGUtbG9nZ2VyXCI7XG5pbXBvcnQge0lBZGFwdGVyQ29uZmlnLCBTcGVlY2hBZGFwdGVyfSBmcm9tIFwiQHNlcnZpY2VzL3NwZWVjaC1hZGFwdGVycy9zcGVlY2guYWRhcHRlclwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5jb25zdCBsb2cgPSBjcmVhdGVMb2coXCJBZGFwdGVyIEhlbHBlcnNcIik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50SGFuZGxlcnM8VCBleHRlbmRzIFNwZWVjaEFkYXB0ZXI+IHtcbiAgW25hbWU6IHN0cmluZ106IChhZGFwdGVyOiBULCAuLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xufVxuZXhwb3J0IGVudW0gRXZlbnRIYW5kbGVycyB7XG4gIFJlYWR5ID0gXCJyZWFkeVwiLFxuICBDbG9zZSA9IFwiY2xvc2VcIixcbiAgRXJyb3IgPSBcImVycm9yXCIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEFkYXB0ZXI8VCBleHRlbmRzIFNwZWVjaEFkYXB0ZXI+KGN1cnJlbnRBZGFwdGVyOiBULCBldmVudEhhbmRsZXJzOiBJRXZlbnRIYW5kbGVyczxUPikge1xuICBsb2coY2hhbGsuY3lhbihcIlNldHVwIEFkYXB0ZXJcIikpO1xuICBPYmplY3QuZW50cmllcyhldmVudEhhbmRsZXJzKS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBlbnRyeVswXTtcbiAgICBjb25zdCBoYW5kbGVyID0gZW50cnlbMV07XG4gICAgY3VycmVudEFkYXB0ZXIub24obmFtZSwgaGFuZGxlci5iaW5kKHVuZGVmaW5lZCwgY3VycmVudEFkYXB0ZXIpKTtcbiAgfSk7XG4gIGN1cnJlbnRBZGFwdGVyLm9wZW4oKTtcbiAgcmV0dXJuIGN1cnJlbnRBZGFwdGVyO1xufVxuIl19