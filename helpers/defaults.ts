import {SpeechResponseTypes} from "@enums/speech-response-type";
import {IResponseAccuracy, IResponseAggregation} from "@interfaces/i.response-accuracy";
import {ISpeechASR} from "@interfaces/i.speech";

// export function ResponseAccuracyDefaults(): IResponseAccuracy {
//   return {
//     matchingParts: 0,
//     mismatchingParts: 0,
//     missingParts: 0,
//     lengthDifference: 0,
//     accuracy: 0,
//   };
// }

export function SpeechASRDefaults(): ISpeechASR {
  return {
    transcript: "",
    type: SpeechResponseTypes.ASR,
    confidence: 0,
  };
}

// export function ResponseAggregationDefaults(): IResponseAggregation {
//   return {
//     all: [] as any,
//     total: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     average: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     best: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//     worst: {...SpeechASRDefaults(), ...ResponseAccuracyDefaults()} as ISpeechASR & IResponseAccuracy,
//   };
// }
