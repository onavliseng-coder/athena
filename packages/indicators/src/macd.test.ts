import { describe, expect, it } from "vitest";

import { macd } from "./macd.js";
import { createCandles } from "./test/createCandles.js";

describe("macd", () => {
  it("calculates MACD, signal and histogram", () => {
    const closes = Array.from({ length: 60 }, (_, i) => 100 + i);

    const candles = createCandles(closes);

    const result = macd(candles);

    expect(result.macd.length).toBeGreaterThan(0);
    expect(result.signal.length).toBeGreaterThan(0);
    expect(result.histogram.length).toBeGreaterThan(0);

    expect(result.signal.length).toBe(result.histogram.length);
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101, 102]);

    expect(() => macd(candles)).toThrow();
  });
});
