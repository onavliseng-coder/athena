import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middleware/authenticate.js";

import { LoginSchema, refreshTokenSchema } from "./schemas.js";
import { AuthService } from "./service.js";

export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService();

  app.post(
    "/auth/login",
    {
      schema: {
        body: LoginSchema,
      },
    },
    async (request) => {
      const credentials = request.body as typeof LoginSchema._output;

      return service.authenticate(credentials);
    },
  );
  app.post(
    "/auth/refresh",
    {
      schema: {
        body: refreshTokenSchema,
      },
    },
    async (request) => {
      const data = request.body as typeof refreshTokenSchema._output;

      return service.refresh(data);
    },
  );
  app.post(
    "/auth/logout",
    {
      schema: {
        body: refreshTokenSchema,
      },
    },
    async (request, reply) => {
      const data = request.body as typeof refreshTokenSchema._output;

      await service.logout(data.refreshToken);

      return reply.status(200).send({
        message: "Logout realizado com sucesso.",
      });
    },
  );
  app.get(
    "/auth/me",
    {
      preHandler: authenticate,
    },
    async (request) => {
      return service.getAuthenticatedUser(request.user.sub);
    },
  );
}
