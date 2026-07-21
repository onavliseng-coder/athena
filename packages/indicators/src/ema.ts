import type { Candle } from "@athena/core";
import { validatePeriod } from "./utils.js";

export function ema(candles: Candle[], period: number): number[] {
  validatePeriod(candles, period);

  const closes = candles.map((candle) => candle.close);

  const multiplier = 2 / (period + 1);

  let previous =
    closes.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  const result: number[] = [previous];

  for (let i = period; i < closes.length; i++) {
    previous = (closes[i] - previous) * multiplier + previous;

    result.push(previous);
  }

  return result;
}
