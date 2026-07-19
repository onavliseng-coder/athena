import type { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";

import { env } from "../config/env.js";

export async function registerJwt(app: FastifyInstance) {
  await app.register(fastifyJwt, {
    secret: env.jwtSecret,
  });
}
