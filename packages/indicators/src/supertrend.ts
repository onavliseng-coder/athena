import type { Candle } from "@athena/core";
import { atr } from "./atr.js";

export interface SuperTrendResult {
  upperBand: number[];
  lowerBand: number[];
  trend: ("UP" | "DOWN")[];
}

export function superTrend(
  candles: Candle[],
  period = 10,
  multiplier = 3,
): SuperTrendResult {
  const atrValues = atr(candles, period);

  const upperBand: number[] = [];
  const lowerBand: number[] = [];
  const trend: ("UP" | "DOWN")[] = [];

  for (let i = period; i < candles.length; i++) {
    const candle = candles[i];
    const atrValue = atrValues[i - period];

    const middle = (candle.high + candle.low) / 2;

    upperBand.push(middle + atrValue * multiplier);
    lowerBand.push(middle - atrValue * multiplier);

    trend.push(candle.close >= middle ? "UP" : "DOWN");
  }

  return {
    upperBand,
    lowerBand,
    trend,
  };
}
