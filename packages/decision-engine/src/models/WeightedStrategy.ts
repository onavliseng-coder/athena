import type { StrategyEvaluation } from "@athena/core";

export interface WeightedStrategy {
  evaluation: StrategyEvaluation;
  weight: number;
}
