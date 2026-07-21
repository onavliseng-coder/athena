import type { FastifyInstance } from "fastify";

import {
  CreateUserSchema,
  UpdateUserSchema,
  UserResponseSchema,
} from "./schemas.js";
import { UsersService } from "./service.js";

export async function usersRoutes(app: FastifyInstance) {
  const service = new UsersService();

  app.post(
    "/users",
    {
      schema: {
        body: CreateUserSchema,
        response: {
          201: UserResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const data = request.body as typeof CreateUserSchema._output;

      const user = await service.createUser(data);

      return reply.code(201).send(user);
    },
  );

  app.get("/users", async () => {
    return service.listUsers();
  });

  app.get("/users/:id", async (request) => {
    const { id } = request.params as { id: string };

    return service.getUserById(id);
  });
  app.patch(
    "/users/:id",
    {
      schema: {
        body: UpdateUserSchema,
        response: {
          200: UserResponseSchema,
        },
      },
    },
    async (request) => {
      const { id } = request.params as { id: string };
      const data = request.body as typeof UpdateUserSchema._output;

      return service.updateUser(id, data);
    },
  );
}
