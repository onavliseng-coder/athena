import { describe, expect, it } from "vitest";

import { evaluate } from "./index.js";

describe("signal-engine", () => {
  it("returns BUY when at least two bullish signals exist", () => {
    const signal = evaluate({
      ema: {
        bullish: true,
      },
      macd: {
        bullishCross: true,
      },
      superTrend: {
        trend: "UP",
      },
    });

    expect(signal.action).toBe("BUY");
    expect(signal.confidence).toBeGreaterThan(0);
    expect(signal.reasons.length).toBe(3);
  });

  it("returns HOLD when there is insufficient confirmation", () => {
    const signal = evaluate({
      ema: {
        bullish: true,
      },
    });

    expect(signal.action).toBe("HOLD");
    expect(signal.reasons.length).toBe(1);
    expect(signal.confidence).toBeLessThan(1);
  });
});
