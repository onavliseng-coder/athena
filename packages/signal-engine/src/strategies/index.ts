import { MeanReversionStrategy } from "./mean-reversion.js";
import type { SignalStrategy } from "./strategy.js";
import { TrendFollowingStrategy } from "./trend-following.js";

export function createDefaultStrategies(): SignalStrategy[] {
  return [new TrendFollowingStrategy(), new MeanReversionStrategy()];
}
