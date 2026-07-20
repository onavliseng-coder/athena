import type { Candle } from "../types.js";

export function createCandles(closes: number[]): Candle[] {
  return closes.map((close, index) => ({
    openTime: new Date(index * 60_000),
    closeTime: new Date(index * 60_000 + 60_000),
    open: close,
    high: close + 1,
    low: close - 1,
    close,
    volume: 100,
  }));
}
