import type {
  IndicatorSnapshot,
  MarketContext,
  SignalResult,
} from "@athena/core";

import { createDefaultStrategies } from "./strategies/index.js";

import type { SignalStrategy } from "./strategies/strategy.js";

export class SignalEngine {
  private readonly strategies: SignalStrategy[];

  constructor(strategies?: SignalStrategy[]) {
    this.strategies = strategies ?? createDefaultStrategies();
  }

  evaluate(
    indicators: IndicatorSnapshot,
    context?: MarketContext,
  ): SignalResult {
    let totalScore = 0;
    let totalMaxScore = 0;

    const reasons = [];

    for (const strategy of this.strategies) {
      const result = strategy.evaluate(indicators, context);

      totalScore += result.score;
      totalMaxScore += result.maxScore;

      reasons.push(...result.reasons);
    }

    const confidence =
      totalMaxScore === 0 ? 0 : Math.min(totalScore / totalMaxScore, 1);

    return {
      action: totalScore >= 2 ? "BUY" : "HOLD",
      confidence,
      reasons,
    };
  }
}
