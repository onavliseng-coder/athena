import type { FastifyInstance } from "fastify";

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { swaggerConfig } from "../config/swagger.js";

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, swaggerConfig);

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });
}
