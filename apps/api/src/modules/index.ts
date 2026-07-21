import type { FastifyInstance } from "fastify";

import { registerAuthModule } from "./auth/index.js";
import { registerHealthModule } from "./health/index.js";
import { registerUsersModule } from "./users/index.js";
import { registerAssetsModule } from "./assets/index.js";
import { registerMarketDataModule } from "./market-data/index.js";

export async function registerModules(app: FastifyInstance) {
  await registerHealthModule(app);

  await registerUsersModule(app);

  await registerAssetsModule(app);

  await registerMarketDataModule(app);
}
