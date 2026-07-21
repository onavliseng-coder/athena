import { BinanceMarketDataProvider } from "./binance/provider.js";

import type { MarketDataProvider } from "./provider.js";

export class MarketDataProviderFactory {
  static create(): MarketDataProvider {
    return new BinanceMarketDataProvider();
  }
}
