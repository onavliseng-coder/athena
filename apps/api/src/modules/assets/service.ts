import { ConflictError } from "../../core/errors/conflict-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";

import { AssetsRepository } from "./repository.js";

import type { CreateAssetInput } from "./types.js";

export class AssetsService {
  constructor(private readonly repository = new AssetsRepository()) {}

  async createAsset(data: CreateAssetInput) {
    const existingAsset = await this.repository.findBySymbol(data.symbol);

    if (existingAsset) {
      throw new ConflictError("Ativo já cadastrado.");
    }

    return this.repository.create(data);
  }

  async listAssets() {
    return this.repository.findAll();
  }

  async getAssetById(id: string) {
    const asset = await this.repository.findById(id);

    if (!asset) {
      throw new NotFoundError("Ativo não encontrado.");
    }

    return asset;
  }
}
