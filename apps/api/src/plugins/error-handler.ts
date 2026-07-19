import type { FastifyInstance } from "fastify";

import { AppError } from "../core/errors/app-error.js";

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name,
        message: error.message,
      });
    }

    app.log.error(error);

    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Erro interno do servidor.",
    });
  });
}
