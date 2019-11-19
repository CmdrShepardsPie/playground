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
    function createSummaryTemplate(promptCount) {
        return {
            totalPrompts: promptCount,
            level3Accuracy: {
                Nuance: 0,
                TivoGoogle: 0,
                TivoNuance: 0,
            },
            services: {
                Nuance: createServiceTemplate(),
                TivoGoogle: createServiceTemplate(),
                TivoNuance: createServiceTemplate(),
            },
        };
    }
    exports.createSummaryTemplate = createSummaryTemplate;
    function createServiceTemplate() {
        return {
            1: { count: 0, percent: 0, errors: [] },
            2: { count: 0, percent: 0, errors: [] },
            3: { count: 0, percent: 0, errors: [] },
            total: { count: 0, percent: 0 },
        };
    }
    exports.createServiceTemplate = createServiceTemplate;
    function roundToHundreth(val) {
        return Math.floor(val * 100) / 100;
    }
    exports.roundToHundreth = roundToHundreth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvc3VtbWFyeS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsU0FBZ0IscUJBQXFCLENBQUMsV0FBbUI7UUFDdkQsT0FBTztZQUNMLFlBQVksRUFBRSxXQUFXO1lBQ3pCLGNBQWMsRUFBRTtnQkFDZCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsQ0FBQztnQkFDYixVQUFVLEVBQUUsQ0FBQzthQUNkO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxxQkFBcUIsRUFBRTtnQkFDL0IsVUFBVSxFQUFFLHFCQUFxQixFQUFFO2dCQUNuQyxVQUFVLEVBQUUscUJBQXFCLEVBQUU7YUFDcEM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQWRELHNEQWNDO0lBRUQsU0FBZ0IscUJBQXFCO1FBQ25DLE9BQU87WUFDTCxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQztZQUNyQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQztZQUNyQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQztZQUNyQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUM7U0FDOUIsQ0FBQztJQUNKLENBQUM7SUFQRCxzREFPQztJQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFXO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFGRCwwQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdW1tYXJ5VGVtcGxhdGUocHJvbXB0Q291bnQ6IG51bWJlcikge1xuICByZXR1cm4ge1xuICAgIHRvdGFsUHJvbXB0czogcHJvbXB0Q291bnQsXG4gICAgbGV2ZWwzQWNjdXJhY3k6IHtcbiAgICAgIE51YW5jZTogMCxcbiAgICAgIFRpdm9Hb29nbGU6IDAsXG4gICAgICBUaXZvTnVhbmNlOiAwLFxuICAgIH0sXG4gICAgc2VydmljZXM6IHtcbiAgICAgIE51YW5jZTogY3JlYXRlU2VydmljZVRlbXBsYXRlKCksXG4gICAgICBUaXZvR29vZ2xlOiBjcmVhdGVTZXJ2aWNlVGVtcGxhdGUoKSxcbiAgICAgIFRpdm9OdWFuY2U6IGNyZWF0ZVNlcnZpY2VUZW1wbGF0ZSgpLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJ2aWNlVGVtcGxhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgMToge2NvdW50OiAwLCBwZXJjZW50OiAwLCBlcnJvcnM6IFtdfSxcbiAgICAyOiB7Y291bnQ6IDAsIHBlcmNlbnQ6IDAsIGVycm9yczogW119LFxuICAgIDM6IHtjb3VudDogMCwgcGVyY2VudDogMCwgZXJyb3JzOiBbXX0sXG4gICAgdG90YWw6IHtjb3VudDogMCwgcGVyY2VudDogMH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFRvSHVuZHJldGgodmFsOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiAxMDApIC8gMTAwO1xufVxuIl19