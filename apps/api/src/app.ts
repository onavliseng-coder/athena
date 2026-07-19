import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { registerModules } from "./modules/index.js";
import { registerPlugins } from "./plugins/index.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await registerPlugins(app);

  await registerModules(app);

  app.get("/", async () => {
    return {
      name: "ATHENA API",
      status: "online",
      version: "0.1.0",
    };
  });

  return app;
}
