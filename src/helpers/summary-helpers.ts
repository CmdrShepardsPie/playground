import {IAccuracyObject} from "@interfaces/i.error";

export function createSummaryTemplate(promptCount: number) {
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

export function createServiceTemplate() {
  return {
    1: { count: 0, percent: 0, errors: [] },
    2: { count: 0, percent: 0, errors: [] },
    3: { count: 0, percent: 0, errors: [] },
    total: { count: 0, percent: 0 },
  };
}

export function roundToHundreth(val: number): number {
  return Math.floor(val * 100) / 100;
}
