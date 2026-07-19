import type { FastifyInstance } from "fastify";

import { registerAuthModule } from "./auth/index.js";
import { registerHealthModule } from "./health/index.js";
import { registerUsersModule } from "./users/index.js";

export async function registerModules(app: FastifyInstance) {
  await registerHealthModule(app);

  await registerAuthModule(app);

  await registerUsersModule(app);
}
