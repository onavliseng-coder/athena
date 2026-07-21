import { describe, expect, it } from "vitest";

import { BinanceProvider } from "../providers/binance.js";

describe("BinanceProvider", () => {
  it("should fetch recent BTCUSDT candles", async () => {
    const provider = new BinanceProvider();

    const candles = await provider.getCandles({
      symbol: "BTCUSDT",
      interval: "1h",
      limit: 10,
    });

    expect(candles).toHaveLength(10);

    for (const candle of candles) {
      expect(candle.openTime).toBeInstanceOf(Date);
      expect(candle.closeTime).toBeInstanceOf(Date);

      expect(candle.open).toEqual(expect.any(Number));
      expect(candle.high).toEqual(expect.any(Number));
      expect(candle.low).toEqual(expect.any(Number));
      expect(candle.close).toEqual(expect.any(Number));
      expect(candle.volume).toEqual(expect.any(Number));

      expect(candle.high).toBeGreaterThanOrEqual(candle.low);
    }
  });
});
