import { z } from "zod";

const envSchema = z.object({
  server: z.object({
    GITHUB_API_URL: z.string(),
  }),
});

export const env = envSchema.parse({ server: process.env });
