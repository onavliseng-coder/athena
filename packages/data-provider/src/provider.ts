import type { Candle } from "@athena/core";
import type { CandleRequest } from "./types.js";

export interface MarketDataProvider {
  getCandles(request: CandleRequest): Promise<Candle[]>;
}
