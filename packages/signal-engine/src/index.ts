import { SignalEngine } from "./engine.js";

import type { IndicatorSnapshot } from "@athena/core";

export * from "./engine.js";

export function evaluate(indicators: IndicatorSnapshot) {
  const engine = new SignalEngine();

  return engine.evaluate(indicators);
}
