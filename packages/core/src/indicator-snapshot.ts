export interface IndicatorSnapshot {
  ema?: {
    bullish: boolean;
  };

  rsi?: {
    value: number;
  };

  macd?: {
    bullishCross: boolean;
  };

  adx?: {
    strength: number;
  };

  superTrend?: {
    trend: "UP" | "DOWN";
  };

  bollinger?: {
    upper: number;
    middle: number;
    lower: number;
    price: number;
  };
}
