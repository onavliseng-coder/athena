import type { SignalReason } from "./signal.js";

export interface StrategyResult {
  score: number;
  maxScore: number;
  reasons: SignalReason[];
}
