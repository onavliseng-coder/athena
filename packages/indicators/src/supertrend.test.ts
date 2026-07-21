import { describe, expect, it } from "vitest";

import { superTrend } from "./supertrend.js";
import { createCandles } from "./test/createCandles.js";

describe("superTrend", () => {
  it("calculates upper band, lower band and trend", () => {
    const closes = Array.from({ length: 50 }, (_, i) => 100 + i);

    const candles = createCandles(closes);

    const result = superTrend(candles);

    expect(result.upperBand.length).toBeGreaterThan(0);
    expect(result.lowerBand.length).toBe(result.upperBand.length);
    expect(result.trend.length).toBe(result.upperBand.length);

    result.trend.forEach((value) => {
      expect(["UP", "DOWN"]).toContain(value);
    });
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101]);

    expect(() => superTrend(candles)).toThrow();
  });
});
