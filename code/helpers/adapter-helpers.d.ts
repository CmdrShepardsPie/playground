import { SpeechAdapter } from "@services/speech-adapters/speech.adapter";
export interface IEventHandlers<T extends SpeechAdapter> {
    [name: string]: (adapter: T, ...args: any[]) => any;
}
export declare enum EventHandlers {
    Ready = "ready",
    Close = "close",
    Error = "error"
}
export declare function setupAdapter<T extends SpeechAdapter>(currentAdapter: T, eventHandlers: IEventHandlers<T>): T;
//# sourceMappingURL=adapter-helpers.d.ts.map