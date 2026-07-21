export interface Candle {
  openTime: Date;
  closeTime: Date;

  open: number;
  high: number;
  low: number;
  close: number;

  volume: number;
}
