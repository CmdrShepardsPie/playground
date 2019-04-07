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
