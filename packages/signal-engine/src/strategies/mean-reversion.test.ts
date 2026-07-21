import { describe, expect, it } from "vitest";

import { MeanReversionStrategy } from "./mean-reversion.js";

describe("MeanReversionStrategy", () => {
  const strategy = new MeanReversionStrategy();

  it("returns score 2 when RSI is oversold and price is below lower Bollinger band", () => {
    const result = strategy.evaluate({
      rsi: {
        value: 25,
      },
      bollinger: {
        upper: 110,
        middle: 100,
        lower: 90,
        price: 85,
      },
    });

    expect(result.score).toBe(2);
    expect(result.maxScore).toBe(2);
    expect(result.reasons).toHaveLength(2);
  });

  it("returns score 0 when no mean reversion conditions are met", () => {
    const result = strategy.evaluate({
      rsi: {
        value: 55,
      },
      bollinger: {
        upper: 110,
        middle: 100,
        lower: 90,
        price: 100,
      },
    });

    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(2);
    expect(result.reasons).toHaveLength(0);
  });
});
