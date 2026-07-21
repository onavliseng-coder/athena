import type { FastifyInstance } from "fastify";

import { AssetResponseSchema, CreateAssetSchema } from "./schemas.js";
import { AssetsService } from "./service.js";

export async function assetRoutes(app: FastifyInstance) {
  const service = new AssetsService();

  app.post(
    "/assets",
    {
      schema: {
        body: CreateAssetSchema,
        response: {
          201: AssetResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const data = request.body as typeof CreateAssetSchema._output;

      const asset = await service.createAsset(data);

      return reply.code(201).send(asset);
    },
  );

  app.get("/assets", async () => {
    return service.listAssets();
  });

  app.get("/assets/:id", async (request) => {
    const { id } = request.params as { id: string };

    return service.getAssetById(id);
  });
}
