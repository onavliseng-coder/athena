import { MarketDataProviderFactory } from "./providers/factory.js";

import type {
  GetCandlesInput,
  GetTickerInput,
  MarketCandle,
  MarketTicker,
} from "./types.js";

export class MarketDataService {
  private readonly provider = MarketDataProviderFactory.create();

  async getTicker(input: GetTickerInput): Promise<MarketTicker> {
    return this.provider.getTicker(input);
  }

  async getCandles(input: GetCandlesInput): Promise<MarketCandle[]> {
    return this.provider.getCandles(input);
  }
}
