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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvc3VtbWFyeS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBRUEsU0FBZ0IscUJBQXFCLENBQUMsV0FBbUI7UUFDdkQsT0FBTztZQUNMLFlBQVksRUFBRSxXQUFXO1lBQ3pCLGNBQWMsRUFBRTtnQkFDZCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsQ0FBQztnQkFDYixVQUFVLEVBQUUsQ0FBQzthQUNkO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxxQkFBcUIsRUFBRTtnQkFDL0IsVUFBVSxFQUFFLHFCQUFxQixFQUFFO2dCQUNuQyxVQUFVLEVBQUUscUJBQXFCLEVBQUU7YUFDcEM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQWRELHNEQWNDO0lBRUQsU0FBZ0IscUJBQXFCO1FBQ25DLE9BQU87WUFDTCxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN2QyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN2QyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7U0FDaEMsQ0FBQztJQUNKLENBQUM7SUFQRCxzREFPQztJQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFXO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFGRCwwQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUFjY3VyYWN5T2JqZWN0fSBmcm9tIFwiQGludGVyZmFjZXMvaS5lcnJvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3VtbWFyeVRlbXBsYXRlKHByb21wdENvdW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3RhbFByb21wdHM6IHByb21wdENvdW50LFxuICAgIGxldmVsM0FjY3VyYWN5OiB7XG4gICAgICBOdWFuY2U6IDAsXG4gICAgICBUaXZvR29vZ2xlOiAwLFxuICAgICAgVGl2b051YW5jZTogMCxcbiAgICB9LFxuICAgIHNlcnZpY2VzOiB7XG4gICAgICBOdWFuY2U6IGNyZWF0ZVNlcnZpY2VUZW1wbGF0ZSgpLFxuICAgICAgVGl2b0dvb2dsZTogY3JlYXRlU2VydmljZVRlbXBsYXRlKCksXG4gICAgICBUaXZvTnVhbmNlOiBjcmVhdGVTZXJ2aWNlVGVtcGxhdGUoKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VydmljZVRlbXBsYXRlKCkge1xuICByZXR1cm4ge1xuICAgIDE6IHsgY291bnQ6IDAsIHBlcmNlbnQ6IDAsIGVycm9yczogW10gfSxcbiAgICAyOiB7IGNvdW50OiAwLCBwZXJjZW50OiAwLCBlcnJvcnM6IFtdIH0sXG4gICAgMzogeyBjb3VudDogMCwgcGVyY2VudDogMCwgZXJyb3JzOiBbXSB9LFxuICAgIHRvdGFsOiB7IGNvdW50OiAwLCBwZXJjZW50OiAwIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFRvSHVuZHJldGgodmFsOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiAxMDApIC8gMTAwO1xufVxuIl19