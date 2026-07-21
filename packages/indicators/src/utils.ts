import type { Candle } from "@athena/core";

export function validatePeriod(candles: Candle[], period: number): void {
  if (!Number.isInteger(period)) {
    throw new Error("Period must be an integer.");
  }

  if (period <= 0) {
    throw new Error("Period must be greater than zero.");
  }

  if (candles.length < period) {
    throw new Error(`At least ${period} candles are required.`);
  }
}
