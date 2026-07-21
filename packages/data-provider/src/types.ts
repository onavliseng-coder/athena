export type { Candle } from "@athena/core";

export interface CandleRequest {
  symbol: string;
  interval: string;
  limit?: number;
}
