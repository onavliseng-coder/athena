import type { FastifyInstance } from "fastify";

import { healthRoutes } from "./routes.js";

export async function registerHealthModule(app: FastifyInstance) {
  await app.register(healthRoutes);
}
