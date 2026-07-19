import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log("Authorization:", request.headers.authorization);

  try {
    await request.jwtVerify();

    console.log("Usuário autenticado:", request.user);
  } catch (error) {
    console.error(error);

    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "Token inválido ou expirado.",
    });
  }
}
