import { describe, expect, it } from "vitest";

import { rsi } from "./rsi.js";
import { createCandles } from "./test/createCandles.js";

describe("rsi", () => {
  it("returns values between 0 and 100", () => {
    const candles = createCandles([
      100, 102, 101, 103, 106, 105, 107, 109, 108, 110, 112, 111, 113, 114, 116,
    ]);

    const values = rsi(candles, 14);

    expect(values).toHaveLength(1);
    expect(values[0]).toBeGreaterThanOrEqual(0);
    expect(values[0]).toBeLessThanOrEqual(100);
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101]);

    expect(() => rsi(candles, 14)).toThrow();
  });
});
