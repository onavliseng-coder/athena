import type { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: "ATHENA API",
      description: "API da plataforma ATHENA",
      version: "0.1.0",
    },

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  transform: jsonSchemaTransform,
};
