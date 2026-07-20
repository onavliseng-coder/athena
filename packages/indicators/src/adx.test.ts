import { describe, expect, it } from "vitest";

import { adx } from "./adx.js";
import { createCandles } from "./test/createCandles.js";

describe("adx", () => {
  it("calculates +DI, -DI and ADX", () => {
    const closes = Array.from({ length: 60 }, (_, i) => 100 + i);

    const candles = createCandles(closes);

    const result = adx(candles);

    expect(result.plusDI.length).toBeGreaterThan(0);
    expect(result.minusDI.length).toBeGreaterThan(0);

    expect(result.plusDI.length).toBe(result.minusDI.length);

    expect(result.adx.length).toBeGreaterThan(0);

    result.adx.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101]);

    expect(() => adx(candles)).toThrow();
  });
});
