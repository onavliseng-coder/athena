import type { FastifyInstance } from "fastify";

import { usersRoutes } from "./routes.js";

export async function registerUsersModule(app: FastifyInstance) {
  await app.register(usersRoutes);
}
