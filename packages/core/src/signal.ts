export type SignalAction = "BUY" | "SELL" | "HOLD";

export interface SignalReason {
  indicator: string;
  message: string;
  weight: number;
}

export interface SignalResult {
  action: SignalAction;
  confidence: number;
  reasons: SignalReason[];
}

export interface MarketContext {
  symbol: string;
  timeframe: string;
  price: number;
  volume?: number;
  timestamp?: Date;
}
