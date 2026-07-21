import type { Candle } from "@athena/core";
import { ema } from "./ema.js";

export interface MacdResult {
  macd: number[];
  signal: number[];
  histogram: number[];
}

export function macd(
  candles: Candle[],
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9,
): MacdResult {
  const fast = ema(candles, fastPeriod);
  const slow = ema(candles, slowPeriod);

  const offset = fast.length - slow.length;

  const macdLine = slow.map((value, index) => fast[index + offset] - value);

  const signalCandles = macdLine.map((value, index) => ({
    openTime: new Date(index),
    closeTime: new Date(index),
    open: value,
    high: value,
    low: value,
    close: value,
    volume: 0,
  }));

  const signal = ema(signalCandles, signalPeriod);

  const histogramOffset = macdLine.length - signal.length;

  const histogram = signal.map(
    (value, index) => macdLine[index + histogramOffset] - value,
  );

  return {
    macd: macdLine,
    signal,
    histogram,
  };
}
