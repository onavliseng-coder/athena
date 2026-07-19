import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve possuir pelo menos 8 caracteres"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;
