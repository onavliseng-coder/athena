import type { FastifyInstance } from "fastify";

import { assetRoutes } from "./routes.js";

export async function registerAssetsModule(app: FastifyInstance) {
  await app.register(assetRoutes);
}
