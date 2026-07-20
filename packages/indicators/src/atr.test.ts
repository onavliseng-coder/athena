import { describe, expect, it } from "vitest";

import { atr } from "./atr.js";
import { createCandles } from "./test/createCandles.js";

describe("atr", () => {
  it("calculates the average true range", () => {
    const candles = createCandles([
      100, 102, 101, 104, 106, 105, 108, 110, 109, 111, 113, 112, 114, 116, 118,
    ]);

    const values = atr(candles, 14);

    expect(values).toHaveLength(1);
    expect(values[0]).toBeGreaterThan(0);
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101]);

    expect(() => atr(candles, 14)).toThrow();
  });
});
