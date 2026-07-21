import type { FastifyInstance } from "fastify";

import marketDataRoutes from "./routes.js";

export async function registerMarketDataModule(app: FastifyInstance) {
  await app.register(marketDataRoutes, {
    prefix: "/market-data",
  });
}

export { MarketDataService } from "./service.js";

export type {
  GetCandlesInput,
  GetTickerInput,
  MarketCandle,
  MarketProvider,
  MarketTicker,
} from "./types.js";

export type { MarketDataProvider } from "./providers/provider.js";
