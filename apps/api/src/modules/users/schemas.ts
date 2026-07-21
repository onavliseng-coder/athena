import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve possuir pelo menos 8 caracteres"),
  name: z.string().min(3, "O nome deve possuir pelo menos 3 caracteres"),
});

export const UpdateUserSchema = z.object({
  email: z.email("E-mail inválido").optional(),
  name: z
    .string()
    .min(3, "O nome deve possuir pelo menos 3 caracteres")
    .optional(),
});

export const UserResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UserResponseSchemaType = z.infer<typeof UserResponseSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
