import { prisma } from "../../database/prisma.js";

import type { CreateAssetInput } from "./types.js";

export class AssetsRepository {
  async create(data: CreateAssetInput) {
    return prisma.asset.create({
      data,
    });
  }

  async findBySymbol(symbol: string) {
    return prisma.asset.findUnique({
      where: {
        symbol,
      },
    });
  }

  async findById(id: string) {
    return prisma.asset.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return prisma.asset.findMany({
      orderBy: {
        symbol: "asc",
      },
    });
  }
}
