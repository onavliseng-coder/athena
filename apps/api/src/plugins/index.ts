import type { FastifyInstance } from "fastify";

import { registerCors } from "./cors.js";
import { registerErrorHandler } from "./error-handler.js";
import { registerJwt } from "./jwt.js";
import { registerSensible } from "./sensible.js";
import { registerSwagger } from "./swagger.js";

export async function registerPlugins(app: FastifyInstance) {
  await registerCors(app);

  await registerSensible(app);

  await registerJwt(app);

  await registerSwagger(app);

  registerErrorHandler(app);
}
