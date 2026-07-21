import type {
  GetCandlesInput,
  GetTickerInput,
  MarketCandle,
  MarketTicker,
} from "../types.js";

export interface MarketDataProvider {
  getTicker(input: GetTickerInput): Promise<MarketTicker>;

  getCandles(input: GetCandlesInput): Promise<MarketCandle[]>;
}
