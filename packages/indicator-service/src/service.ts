import type { Candle } from "@athena/data-provider";

import { adx, bollinger, ema, macd, rsi, superTrend } from "@athena/indicators";

import type { IndicatorSnapshot } from "@athena/core";

export class IndicatorService {
  buildSnapshot(candles: Candle[]): IndicatorSnapshot {
    const emaFast = ema(candles, 9);
    const emaSlow = ema(candles, 21);

    const rsiValues = rsi(candles, 14);

    const macdValues = macd(candles);

    const bollingerValues = bollinger(candles);

    const adxValues = adx(candles);

    const superTrendValues = superTrend(candles);

    const lastPrice = candles.at(-1)!.close;

    const lastMacd = macdValues.macd[macdValues.macd.length - 1];

    const lastSignal = macdValues.signal[macdValues.signal.length - 1];

    return {
      ema: {
        bullish: emaFast.at(-1)! > emaSlow.at(-1)!,
      },

      rsi: {
        value: rsiValues.at(-1)!,
      },

      macd: {
        bullishCross: lastMacd > lastSignal,
      },

      adx: {
        strength: adxValues.adx.at(-1)!,
      },

      superTrend: {
        trend: superTrendValues.trend.at(-1)!,
      },

      bollinger: {
        upper: bollingerValues.upper.at(-1)!,
        middle: bollingerValues.middle.at(-1)!,
        lower: bollingerValues.lower.at(-1)!,
        price: lastPrice,
      },
    };
  }
}
