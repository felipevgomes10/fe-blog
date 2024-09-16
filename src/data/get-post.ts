import { env } from "@/env/env";
import { api } from "@/lib/api";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";
import { getLocale } from "next-intl/server";

export async function getPost(slug: string) {
  const locale = await getLocale();

  const response = await api(
    `${env.server.GITHUB_API_URL}/${locale}/${slug}.md`,
  );
  const post: APIPost = await response.json();

  return parsePostFromApi(post);
}
