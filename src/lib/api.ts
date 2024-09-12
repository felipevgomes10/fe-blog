import { env } from "@/env/env";

export function api(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${env.server.GITHUB_TOKEN}`,
    },
  });
}
