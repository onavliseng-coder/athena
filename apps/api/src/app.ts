import Fastify from "fastify";
import { routes } from "./routes/index.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(routes);

  app.get("/", async () => {
    return {
      name: "ATHENA API",
      status: "online",
      version: "0.1.0",
    };
  });

  return app;
}
