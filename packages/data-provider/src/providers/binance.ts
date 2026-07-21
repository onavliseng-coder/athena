import type { MarketDataProvider } from "../provider.js";
import type { Candle } from "@athena/core";
import type { CandleRequest } from "../types.js";

const BASE_URL = "https://api.binance.com";

export class BinanceProvider implements MarketDataProvider {
  async getCandles(request: CandleRequest): Promise<Candle[]> {
    const params = new URLSearchParams({
      symbol: request.symbol.toUpperCase(),
      interval: request.interval,
      limit: String(request.limit ?? 500),
    });

    const response = await fetch(
      `${BASE_URL}/api/v3/klines?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error(
        `Binance API returned ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as unknown[];

    return data.map(
      (kline: any): Candle => ({
        openTime: new Date(Number(kline[0])),
        closeTime: new Date(Number(kline[6])),

        open: Number(kline[1]),
        high: Number(kline[2]),
        low: Number(kline[3]),
        close: Number(kline[4]),

        volume: Number(kline[5]),
      }),
    );
  }
}
