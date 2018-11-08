import {createLog} from "@helpers/node-logger";
import {IAdapterConfig, SpeechAdapter} from "@services/speech-adapters/speech.adapter";
import chalk from "chalk";

const log = createLog("Adapter Helpers");

export interface IEventHandlers<T extends SpeechAdapter> {
  [name: string]: (adapter: T, ...args: any[]) => any;
}
export enum EventHandlers {
  Ready = "ready",
  Close = "close",
  Error = "error",
}

export function setupAdapter<T extends SpeechAdapter>(currentAdapter: T, eventHandlers: IEventHandlers<T>) {
  log(chalk.cyan("Setup Adapter"));
  Object.entries(eventHandlers).forEach((entry) => {
    const name = entry[0];
    const handler = entry[1];
    currentAdapter.on(name, handler.bind(undefined, currentAdapter));
  });
  currentAdapter.open();
  return currentAdapter;
}
