import { env } from "@/env/env";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";
import { getLocale } from "next-intl/server";
import { Markdown } from "./markdown";

type ArticleProps = {
  slug: string;
};

async function getPost(slug: string) {
  const locale = await getLocale();

  const response = await fetch(
    `${env.server.GITHUB_API_URL}/${locale}/${slug}.md`,
    { next: { revalidate: 300 } }
  );
  const post: APIPost = await response.json();

  return parsePostFromApi(post);
}

export async function Article({ slug }: Readonly<ArticleProps>) {
  const post = await getPost(slug);

  return (
    <div className="m-auto h-full">
      <article className="prose lg:prose-xl prose-slate dark:prose-invert">
        <Markdown content={post.content} />
      </article>
    </div>
  );
}
