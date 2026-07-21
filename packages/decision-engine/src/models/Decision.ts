import type { SignalReason } from "@athena/core";

export type DecisionAction = "BUY" | "SELL" | "HOLD";

export interface Decision {
  action: DecisionAction;

  confidence: number;

  reasons: SignalReason[];

  strategies: string[];
}
