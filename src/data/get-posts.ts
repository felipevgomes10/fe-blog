"use server";

import { env } from "@/env/env";
import { defaultLocale, type SupportedLocale } from "@/i18n/supported-locales";
import { api } from "@/lib/api";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";

export async function getPosts(locale: SupportedLocale = defaultLocale) {
  const response = await api(`${env.server.GITHUB_API_URL}/${locale}`);
  const posts: APIPost[] = await response.json();

  return Promise.all(posts.map(parsePostFromApi));
}
