import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./health.js";

export async function routes(app: FastifyInstance) {
  await app.register(healthRoutes);
}
