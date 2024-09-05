import { env } from "@/env/env";
import { api } from "@/lib/api";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import { Markdown } from "./markdown";

type ArticleProps = {
  locale: string;
  slug: string;
};

async function getPost(slug: string) {
  const locale = await getLocale();

  const response = await api(
    `${env.server.GITHUB_API_URL}/${locale}/${slug}.md`
  );
  const post: APIPost = await response.json();

  return parsePostFromApi(post);
}

export async function Article({ slug, locale }: Readonly<ArticleProps>) {
  unstable_setRequestLocale(locale);

  const post = await getPost(slug);

  return (
    <div className="m-auto h-full">
      <article className="prose lg:prose-xl prose-slate dark:prose-invert">
        <Markdown content={post.content} />
      </article>
    </div>
  );
}
