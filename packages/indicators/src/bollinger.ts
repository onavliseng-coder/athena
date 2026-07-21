import type { Candle } from "@athena/core";
import { sma } from "./sma.js";
import { validatePeriod } from "./utils.js";

export interface BollingerBands {
  upper: number[];
  middle: number[];
  lower: number[];
}

export function bollinger(
  candles: Candle[],
  period = 20,
  multiplier = 2,
): BollingerBands {
  validatePeriod(candles, period);

  const middle = sma(candles, period);

  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = period - 1; i < candles.length; i++) {
    const window = candles.slice(i - period + 1, i + 1).map((c) => c.close);

    const mean = middle[i - period + 1];

    const variance =
      window.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      period;

    const deviation = Math.sqrt(variance);

    upper.push(mean + deviation * multiplier);
    lower.push(mean - deviation * multiplier);
  }

  return {
    upper,
    middle,
    lower,
  };
}
