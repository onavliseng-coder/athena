import type { StrategyResult } from "./StrategyResult.js";

export interface StrategyEvaluation {
  strategy: string;
  result: StrategyResult;
}
