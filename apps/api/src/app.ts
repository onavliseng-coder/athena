import Fastify from "fastify";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", async () => {
    return {
      name: "ATHENA API",
      status: "online",
      version: "0.1.0",
    };
  });

  return app;
}
