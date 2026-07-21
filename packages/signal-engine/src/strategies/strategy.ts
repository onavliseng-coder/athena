import type {
  IndicatorSnapshot,
  MarketContext,
  SignalReason,
} from "@athena/core";

export interface StrategyResult {
  score: number;
  maxScore: number;
  reasons: SignalReason[];
}

export interface SignalStrategy {
  evaluate(
    indicators: IndicatorSnapshot,
    context?: MarketContext,
  ): StrategyResult;
}
