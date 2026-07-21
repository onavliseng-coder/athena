import type { Candle } from "@athena/core";
import { validatePeriod } from "./utils.js";

export function rsi(candles: Candle[], period: number): number[] {
  validatePeriod(candles, period + 1);

  const closes = candles.map((candle) => candle.close);

  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];

    gains.push(Math.max(change, 0));
    losses.push(Math.max(-change, 0));
  }

  const result: number[] = [];

  let averageGain =
    gains.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  let averageLoss =
    losses.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  if (averageLoss === 0) {
    result.push(100);
  } else {
    const rs = averageGain / averageLoss;

    result.push(100 - 100 / (1 + rs));
  }

  for (let i = period; i < gains.length; i++) {
    averageGain = (averageGain * (period - 1) + gains[i]) / period;

    averageLoss = (averageLoss * (period - 1) + losses[i]) / period;

    if (averageLoss === 0) {
      result.push(100);
      continue;
    }

    const rs = averageGain / averageLoss;

    result.push(100 - 100 / (1 + rs));
  }

  return result;
}
