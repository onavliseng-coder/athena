import type {
  IndicatorSnapshot,
  MarketContext,
  StrategyResult,
} from "@athena/core";

export interface SignalStrategy {
  evaluate(
    indicators: IndicatorSnapshot,
    context?: MarketContext,
  ): StrategyResult;
}
