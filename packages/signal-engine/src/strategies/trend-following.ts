import type { IndicatorSnapshot, SignalReason } from "@athena/core";

import type { SignalStrategy, StrategyResult } from "./strategy.js";

export class TrendFollowingStrategy implements SignalStrategy {
  evaluate(indicators: IndicatorSnapshot): StrategyResult {
    const reasons: SignalReason[] = [];

    let score = 0;

    if (indicators.ema?.bullish) {
      score++;

      reasons.push({
        indicator: "EMA",
        message: "Bullish trend",
        weight: 1,
      });
    }

    if (indicators.macd?.bullishCross) {
      score++;

      reasons.push({
        indicator: "MACD",
        message: "Bullish crossover",
        weight: 1,
      });
    }

    if (indicators.superTrend?.trend === "UP") {
      score++;

      reasons.push({
        indicator: "SuperTrend",
        message: "Trend is UP",
        weight: 1,
      });
    }

    return {
      score,
      maxScore: 3,
      reasons,
    };
  }
}
