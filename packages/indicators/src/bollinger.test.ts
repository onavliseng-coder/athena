import { describe, expect, it } from "vitest";

import { bollinger } from "./bollinger.js";
import { createCandles } from "./test/createCandles.js";

describe("bollinger", () => {
  it("calculates upper, middle and lower bands", () => {
    const closes = Array.from({ length: 40 }, (_, i) => 100 + i);

    const candles = createCandles(closes);

    const result = bollinger(candles);

    expect(result.upper.length).toBeGreaterThan(0);
    expect(result.middle.length).toBe(result.upper.length);
    expect(result.lower.length).toBe(result.upper.length);

    result.upper.forEach((upper, index) => {
      expect(upper).toBeGreaterThan(result.middle[index]);
      expect(result.middle[index]).toBeGreaterThan(result.lower[index]);
    });
  });

  it("throws when there are not enough candles", () => {
    const candles = createCandles([100, 101]);

    expect(() => bollinger(candles)).toThrow();
  });
});
