import { z } from "zod";

const envSchema = z.object({
  HYGRAPH_API_URL: z.string(),
  HYGRAPH_QUERY_TOKEN: z.string(),
  HYGRAPH_MUTATION_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
