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
    const speech_response_type_1 = require("@enums/speech-response-type");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHNFQUFnRTtJQUdoRSxrRUFBa0U7SUFDbEUsYUFBYTtJQUNiLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLElBQUk7SUFFSixTQUFnQixpQkFBaUI7UUFDL0IsT0FBTztZQUNMLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLDBDQUFtQixDQUFDLEdBQUc7WUFDN0IsVUFBVSxFQUFFLENBQUM7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQU5ELDhDQU1DOztBQUVELHdFQUF3RTtBQUN4RSxhQUFhO0FBQ2Isc0JBQXNCO0FBQ3RCLHdHQUF3RztBQUN4RywwR0FBMEc7QUFDMUcsdUdBQXVHO0FBQ3ZHLHdHQUF3RztBQUN4RyxPQUFPO0FBQ1AsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3BlZWNoUmVzcG9uc2VUeXBlc30gZnJvbSBcIkBlbnVtcy9zcGVlY2gtcmVzcG9uc2UtdHlwZVwiO1xuaW1wb3J0IHtJU3BlZWNoQVNSfSBmcm9tIFwiQGludGVyZmFjZXMvaS5zcGVlY2hcIjtcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIFJlc3BvbnNlQWNjdXJhY3lEZWZhdWx0cygpOiBJUmVzcG9uc2VBY2N1cmFjeSB7XG4vLyAgIHJldHVybiB7XG4vLyAgICAgbWF0Y2hpbmdQYXJ0czogMCxcbi8vICAgICBtaXNtYXRjaGluZ1BhcnRzOiAwLFxuLy8gICAgIG1pc3NpbmdQYXJ0czogMCxcbi8vICAgICBsZW5ndGhEaWZmZXJlbmNlOiAwLFxuLy8gICAgIGFjY3VyYWN5OiAwLFxuLy8gICB9O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gU3BlZWNoQVNSRGVmYXVsdHMoKTogSVNwZWVjaEFTUiB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNjcmlwdDogXCJcIixcbiAgICB0eXBlOiBTcGVlY2hSZXNwb25zZVR5cGVzLkFTUixcbiAgICBjb25maWRlbmNlOiAwLFxuICB9O1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gUmVzcG9uc2VBZ2dyZWdhdGlvbkRlZmF1bHRzKCk6IElSZXNwb25zZUFnZ3JlZ2F0aW9uIHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICBhbGw6IFtdIGFzIGFueSxcbi8vICAgICB0b3RhbDogey4uLlNwZWVjaEFTUkRlZmF1bHRzKCksIC4uLlJlc3BvbnNlQWNjdXJhY3lEZWZhdWx0cygpfSBhcyBJU3BlZWNoQVNSICYgSVJlc3BvbnNlQWNjdXJhY3ksXG4vLyAgICAgYXZlcmFnZTogey4uLlNwZWVjaEFTUkRlZmF1bHRzKCksIC4uLlJlc3BvbnNlQWNjdXJhY3lEZWZhdWx0cygpfSBhcyBJU3BlZWNoQVNSICYgSVJlc3BvbnNlQWNjdXJhY3ksXG4vLyAgICAgYmVzdDogey4uLlNwZWVjaEFTUkRlZmF1bHRzKCksIC4uLlJlc3BvbnNlQWNjdXJhY3lEZWZhdWx0cygpfSBhcyBJU3BlZWNoQVNSICYgSVJlc3BvbnNlQWNjdXJhY3ksXG4vLyAgICAgd29yc3Q6IHsuLi5TcGVlY2hBU1JEZWZhdWx0cygpLCAuLi5SZXNwb25zZUFjY3VyYWN5RGVmYXVsdHMoKX0gYXMgSVNwZWVjaEFTUiAmIElSZXNwb25zZUFjY3VyYWN5LFxuLy8gICB9O1xuLy8gfVxuIl19