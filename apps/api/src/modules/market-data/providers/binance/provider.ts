import type {
  GetCandlesInput,
  GetTickerInput,
  MarketCandle,
  MarketTicker,
} from "../../types.js";

import type { MarketDataProvider } from "../provider.js";

const BINANCE_API_URL = "https://api.binance.com";

export class BinanceMarketDataProvider implements MarketDataProvider {
  async getTicker(input: GetTickerInput): Promise<MarketTicker> {
    const response = await fetch(
      `${BINANCE_API_URL}/api/v3/ticker/price?symbol=${input.symbol}`,
    );

    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}.`);
    }

    const data = (await response.json()) as {
      symbol: string;
      price: string;
    };

    return {
      symbol: data.symbol,
      price: Number(data.price),
      timestamp: new Date(),
      provider: "BINANCE",
    };
  }
  async getCandles(input: GetCandlesInput): Promise<MarketCandle[]> {
    const limit = input.limit ?? 100;

    const response = await fetch(
      `${BINANCE_API_URL}/api/v3/klines?symbol=${input.symbol}&interval=${input.interval}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}.`);
    }

    const data = (await response.json()) as [
      number,
      string,
      string,
      string,
      string,
      string,
      number,
      string,
      number,
      string,
      string,
      string,
    ][];

    return data.map((candle) => ({
      openTime: new Date(candle[0]),
      closeTime: new Date(candle[6]),

      open: Number(candle[1]),
      high: Number(candle[2]),
      low: Number(candle[3]),
      close: Number(candle[4]),

      volume: Number(candle[5]),
    }));
  }
}
