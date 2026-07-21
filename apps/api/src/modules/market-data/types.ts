export type MarketProvider = "BINANCE";

export interface MarketTicker {
  symbol: string;
  price: number;
  timestamp: Date;
  provider: MarketProvider;
}

export interface MarketCandle {
  openTime: Date;
  closeTime: Date;

  open: number;
  high: number;
  low: number;
  close: number;

  volume: number;
}

export interface GetTickerInput {
  symbol: string;
}

export interface GetCandlesInput {
  symbol: string;
  interval: string;
  limit?: number;
}

export interface MarketDataProvider {
  getTicker(input: GetTickerInput): Promise<MarketTicker>;

  getCandles(input: GetCandlesInput): Promise<MarketCandle[]>;
}
