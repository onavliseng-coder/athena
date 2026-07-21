import type { Candle } from "@athena/core";
import { validatePeriod } from "./utils.js";

export function atr(candles: Candle[], period: number): number[] {
  validatePeriod(candles, period + 1);

  const trueRanges: number[] = [];

  for (let i = 1; i < candles.length; i++) {
    const current = candles[i];
    const previousClose = candles[i - 1].close;

    const highLow = current.high - current.low;
    const highClose = Math.abs(current.high - previousClose);
    const lowClose = Math.abs(current.low - previousClose);

    trueRanges.push(Math.max(highLow, highClose, lowClose));
  }

  const result: number[] = [];

  let previousAtr =
    trueRanges.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  result.push(previousAtr);

  for (let i = period; i < trueRanges.length; i++) {
    previousAtr = (previousAtr * (period - 1) + trueRanges[i]) / period;

    result.push(previousAtr);
  }

  return result;
}
