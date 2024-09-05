import { env } from "@/env/env";
import { api } from "@/lib/api";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Markdown } from "./markdown";

type ArticleProps = {
  locale: string;
  slug: string;
};

async function getPost(slug: string) {
  const locale = await getLocale();

  const response = await api(
    `${env.server.GITHUB_API_URL}/${locale}/${slug}.md`,
  );
  const post: APIPost = await response.json();

  return parsePostFromApi(post);
}

export async function Article({ slug, locale }: Readonly<ArticleProps>) {
  unstable_setRequestLocale(locale);

  const post = await getPost(slug);

  return (
    <div className="flex flex-col gap-8">
      {post.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden rounded-md md:h-96 lg:h-[500px]">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            quality={75}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div
        className="m-auto min-h-screen max-w-max rounded-md bg-background p-6 data-[translate=true]:max-w-[95%] data-[translate=true]:-translate-y-52 lg:data-[translate=true]:max-w-max lg:data-[translate=true]:p-8"
        data-translate={!!post.thumbnail}
      >
        <article className="prose prose-slate dark:prose-invert lg:prose-xl">
          <Markdown content={post.content} />
        </article>
      </div>
    </div>
  );
}
