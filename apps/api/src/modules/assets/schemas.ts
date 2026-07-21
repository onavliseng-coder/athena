import { z } from "zod";

export const CreateAssetSchema = z.object({
  symbol: z
    .string()
    .min(2, "O símbolo deve possuir pelo menos 2 caracteres")
    .max(20, "O símbolo deve possuir no máximo 20 caracteres")
    .transform((value) => value.toUpperCase()),

  name: z.string().min(2, "O nome deve possuir pelo menos 2 caracteres"),

  market: z.enum(["CRYPTO", "STOCK", "FOREX", "INDEX", "COMMODITY"], {
    error: "Mercado inválido.",
  }),
});

export const AssetResponseSchema = z.object({
  id: z.uuid(),
  symbol: z.string(),
  name: z.string(),
  market: z.enum(["CRYPTO", "STOCK", "FOREX", "INDEX", "COMMODITY"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateAssetSchemaType = z.infer<typeof CreateAssetSchema>;
export type AssetResponseSchemaType = z.infer<typeof AssetResponseSchema>;
