import { describe, expect, it } from "vitest";

import { ema } from "./ema.js";
import { createCandles } from "./test/createCandles.js";

describe("ema", () => {
  it("calculates the exponential moving average", () => {
    const candles = createCandles([10, 20, 30, 40, 50]);

    const values = ema(candles, 3);

    expect(values).toHaveLength(3);
    expect(values[0]).toBeCloseTo(20, 5);
    expect(values[1]).toBeCloseTo(30, 5);
    expect(values[2]).toBeCloseTo(40, 5);
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([10, 20]);

    expect(() => ema(candles, 3)).toThrow();
  });
});
