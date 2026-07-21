import type { IndicatorSnapshot, SignalReason } from "@athena/core";

import type { SignalStrategy, StrategyResult } from "./strategy.js";

export class MeanReversionStrategy implements SignalStrategy {
  evaluate(indicators: IndicatorSnapshot): StrategyResult {
    const reasons: SignalReason[] = [];

    let score = 0;

    if (indicators.rsi && indicators.rsi.value < 30) {
      score++;

      reasons.push({
        indicator: "RSI",
        message: "Oversold market",
        weight: 0.8,
      });
    }

    if (
      indicators.bollinger &&
      indicators.bollinger.price < indicators.bollinger.lower
    ) {
      score++;

      reasons.push({
        indicator: "Bollinger Bands",
        message: "Price below lower band",
        weight: 1.2,
      });
    }

    return {
      score,
      maxScore: 2,
      reasons,
    };
  }
}
