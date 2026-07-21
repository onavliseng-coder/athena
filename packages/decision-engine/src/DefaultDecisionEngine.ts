import type { Decision } from "./models/index.js";
import type { StrategyEvaluation } from "@athena/core";

import type { DecisionEngine } from "./DecisionEngine.js";

export class DefaultDecisionEngine implements DecisionEngine {
  evaluate(evaluations: StrategyEvaluation[]): Decision {
    if (evaluations.length === 0) {
      return {
        action: "HOLD",
        confidence: 0,
        reasons: [],
        strategies: [],
      };
    }

    const total = evaluations.reduce(
      (sum, evaluation) =>
        sum + evaluation.result.score / evaluation.result.maxScore,
      0,
    );

    const confidence = (total / evaluations.length) * 100;

    return {
      action: confidence >= 70 ? "BUY" : "HOLD",

      confidence,

      reasons: evaluations.flatMap((e) => e.result.reasons),

      strategies: evaluations.map((e) => e.strategy),
    };
  }
}
