import type { Market } from "../../generated/prisma/enums.js";

export interface CreateAssetInput {
  symbol: string;
  name: string;
  market: Market;
}

export interface AssetResponse {
  id: string;
  symbol: string;
  name: string;
  market: Market;
  createdAt: Date;
  updatedAt: Date;
}
