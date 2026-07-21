import type { FastifyPluginAsync } from "fastify";
import { MarketDataService } from "./service.js";

const marketDataRoutes: FastifyPluginAsync = async (app) => {
  const marketDataService = new MarketDataService();

  app.get("/ticker/:symbol", async (request) => {
    const { symbol } = request.params as {
      symbol: string;
    };

    return marketDataService.getTicker({
      symbol: symbol.toUpperCase(),
    });
  });
  app.get("/candles/:symbol", async (request) => {
    const { symbol } = request.params as {
      symbol: string;
    };

    const { interval, limit } = request.query as {
      interval?: string;
      limit?: string;
    };

    return marketDataService.getCandles({
      symbol: symbol.toUpperCase(),
      interval: interval ?? "1h",
      limit: limit ? Number(limit) : 100,
    });
  });
};

export default marketDataRoutes;
