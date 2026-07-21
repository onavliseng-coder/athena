import type { StrategyEvaluation } from "@athena/core";

import type { Decision } from "./models/index.js";

export interface DecisionEngine {
  evaluate(evaluations: StrategyEvaluation[]): Decision;
}
