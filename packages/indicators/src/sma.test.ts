import { describe, expect, it } from "vitest";

import { sma } from "./sma.js";
import { createCandles } from "./test/createCandles.js";
describe("sma", () => {
  it("calculates the simple moving average", () => {
    const candles = createCandles([10, 20, 30, 40, 50]);

    expect(sma(candles, 3)).toEqual([20, 30, 40]);
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([10, 20]);

    expect(() => sma(candles, 3)).toThrow();
  });
});
