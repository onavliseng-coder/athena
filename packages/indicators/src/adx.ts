import type { Candle } from "@athena/core";
import { atr } from "./atr.js";
import { validatePeriod } from "./utils.js";

export interface AdxResult {
  plusDI: number[];
  minusDI: number[];
  adx: number[];
}

export function adx(candles: Candle[], period = 14): AdxResult {
  validatePeriod(candles, period + 1);

  const atrValues = atr(candles, period);

  const plusDM: number[] = [];
  const minusDM: number[] = [];

  for (let i = 1; i < candles.length; i++) {
    const upMove = candles[i].high - candles[i - 1].high;
    const downMove = candles[i - 1].low - candles[i].low;

    plusDM.push(upMove > downMove && upMove > 0 ? upMove : 0);

    minusDM.push(downMove > upMove && downMove > 0 ? downMove : 0);
  }

  const plusDI = atrValues.map((atrValue, index) =>
    atrValue === 0 ? 0 : (plusDM[index + period - 1] / atrValue) * 100,
  );

  const minusDI = atrValues.map((atrValue, index) =>
    atrValue === 0 ? 0 : (minusDM[index + period - 1] / atrValue) * 100,
  );

  const dx = plusDI.map((plus, index) => {
    const minus = minusDI[index];
    const denominator = plus + minus;

    if (denominator === 0) {
      return 0;
    }

    return (Math.abs(plus - minus) / denominator) * 100;
  });

  const adxValues: number[] = [];

  if (dx.length >= period) {
    let first = dx.slice(0, period).reduce((a, b) => a + b, 0) / period;

    adxValues.push(first);

    for (let i = period; i < dx.length; i++) {
      first = (first * (period - 1) + dx[i]) / period;
      adxValues.push(first);
    }
  }

  return {
    plusDI,
    minusDI,
    adx: adxValues,
  };
}
