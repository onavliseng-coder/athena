import type { Candle } from "@athena/core";
import { validatePeriod } from "./utils.js";

export function sma(candles: Candle[], period: number): number[] {
  validatePeriod(candles, period);
  const result: number[] = [];

  for (let i = period - 1; i < candles.length; i++) {
    let sum = 0;

    for (let j = i - period + 1; j <= i; j++) {
      sum += candles[j].close;
    }

    result.push(sum / period);
  }

  return result;
}
