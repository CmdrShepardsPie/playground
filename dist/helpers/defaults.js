(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@enums/speech-response-type"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var speech_response_type_1 = require("@enums/speech-response-type");
    // export function ResponseAccuracyDefaults(): IResponseAccuracy {
    //   return {
    //     matchingParts: 0,
    //     mismatchingParts: 0,
    //     missingParts: 0,
    //     lengthDifference: 0,
    //     accuracy: 0,
    //   };
    // }
    function SpeechASRDefaults() {
        return {
            transcript: "",
            type: speech_response_type_1.SpeechResponseTypes.ASR,
            confidence: 0,
        };
    }
    exports.SpeechASRDefaults = SpeechASRDefaults;
});
// export function ResponseAggregationDefaults(): IResponseAggregation {
//   return {
//     all: [] as any,
//     total: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     average: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     best: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     worst: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//   };
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG9FQUFnRTtJQUloRSxrRUFBa0U7SUFDbEUsYUFBYTtJQUNiLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLElBQUk7SUFFSixTQUFnQixpQkFBaUI7UUFDL0IsT0FBTztZQUNMLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLDBDQUFtQixDQUFDLEdBQUc7WUFDN0IsVUFBVSxFQUFFLENBQUM7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQU5ELDhDQU1DOztBQUVELHdFQUF3RTtBQUN4RSxhQUFhO0FBQ2Isc0JBQXNCO0FBQ3RCLHdHQUF3RztBQUN4RywwR0FBMEc7QUFDMUcsdUdBQXVHO0FBQ3ZHLHdHQUF3RztBQUN4RyxPQUFPO0FBQ1AsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3BlZWNoUmVzcG9uc2VUeXBlc30gZnJvbSBcIkBlbnVtcy9zcGVlY2gtcmVzcG9uc2UtdHlwZVwiO1xuaW1wb3J0IHtJUmVzcG9uc2VBY2N1cmFjeSwgSVJlc3BvbnNlQWdncmVnYXRpb259IGZyb20gXCJAaW50ZXJmYWNlcy9pLnJlc3BvbnNlLWFjY3VyYWN5XCI7XG5pbXBvcnQge0lTcGVlY2hBU1J9IGZyb20gXCJAaW50ZXJmYWNlcy9pLnNwZWVjaFwiO1xuXG4vLyBleHBvcnQgZnVuY3Rpb24gUmVzcG9uc2VBY2N1cmFjeURlZmF1bHRzKCk6IElSZXNwb25zZUFjY3VyYWN5IHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICBtYXRjaGluZ1BhcnRzOiAwLFxuLy8gICAgIG1pc21hdGNoaW5nUGFydHM6IDAsXG4vLyAgICAgbWlzc2luZ1BhcnRzOiAwLFxuLy8gICAgIGxlbmd0aERpZmZlcmVuY2U6IDAsXG4vLyAgICAgYWNjdXJhY3k6IDAsXG4vLyAgIH07XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBTcGVlY2hBU1JEZWZhdWx0cygpOiBJU3BlZWNoQVNSIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2NyaXB0OiBcIlwiLFxuICAgIHR5cGU6IFNwZWVjaFJlc3BvbnNlVHlwZXMuQVNSLFxuICAgIGNvbmZpZGVuY2U6IDAsXG4gIH07XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBSZXNwb25zZUFnZ3JlZ2F0aW9uRGVmYXVsdHMoKTogSVJlc3BvbnNlQWdncmVnYXRpb24ge1xuLy8gICByZXR1cm4ge1xuLy8gICAgIGFsbDogW10gYXMgYW55LFxuLy8gICAgIHRvdGFsOiB7Li4uU3BlZWNoQVNSRGVmYXVsdHMoKSwgLi4uUmVzcG9uc2VBY2N1cmFjeURlZmF1bHRzKCl9IGFzIElTcGVlY2hBU1IgJiBJUmVzcG9uc2VBY2N1cmFjeSxcbi8vICAgICBhdmVyYWdlOiB7Li4uU3BlZWNoQVNSRGVmYXVsdHMoKSwgLi4uUmVzcG9uc2VBY2N1cmFjeURlZmF1bHRzKCl9IGFzIElTcGVlY2hBU1IgJiBJUmVzcG9uc2VBY2N1cmFjeSxcbi8vICAgICBiZXN0OiB7Li4uU3BlZWNoQVNSRGVmYXVsdHMoKSwgLi4uUmVzcG9uc2VBY2N1cmFjeURlZmF1bHRzKCl9IGFzIElTcGVlY2hBU1IgJiBJUmVzcG9uc2VBY2N1cmFjeSxcbi8vICAgICB3b3JzdDogey4uLlNwZWVjaEFTUkRlZmF1bHRzKCksIC4uLlJlc3BvbnNlQWNjdXJhY3lEZWZhdWx0cygpfSBhcyBJU3BlZWNoQVNSICYgSVJlc3BvbnNlQWNjdXJhY3ksXG4vLyAgIH07XG4vLyB9XG4iXX0=