export function api(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
}
