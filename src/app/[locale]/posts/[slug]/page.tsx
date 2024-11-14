import { Markdown } from "@/components/markdown";
import { PageNotFound } from "@/components/page-not-found";
import { ScrollProgress } from "@/components/scroll-progress";
import { getPost } from "@/data/get-post";
import { getPosts } from "@/data/get-posts";
import {
  supportedLocales,
  type SupportedLocale,
} from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

type Params = {
  locale: SupportedLocale;
  slug: string;
};

type GenerateMetadata = {
  params: Params;
};

type PostProps = {
  params: Params;
};

export const revalidate = 3600; // Every hour

export async function generateStaticParams() {
  const posts = await getPosts();

  const params = posts.flatMap(({ slug }) => {
    const postByLocales = supportedLocales.map((locale) => ({
      locale,
      slug,
    }));

    return postByLocales;
  });

  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: GenerateMetadata): Promise<Metadata> {
  const [t, post] = await Promise.all([
    getTranslations({ locale }),
    getPost(slug),
  ]);

  if (!post) {
    return {
      title: t("post.not_found.title"),
      description: t("post.not_found.message"),
    };
  }

  return {
    title: `${t("metadata.title")} - ${post.title}`,
    description: post.description,
  };
}

export default async function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  unstable_setRequestLocale(locale);

  const [t, post] = await Promise.all([
    getTranslations({ locale, namespace: "post.not_found" }),
    getPost(slug),
  ]);

  if (!post) {
    return (
      <PageNotFound
        title={t("title")}
        message={t("message")}
        back={t("back")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ScrollProgress />
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
        className="m-auto min-h-screen max-w-max rounded-md bg-background sm:p-6 data-[translate=true]:sm:max-w-[95%] data-[translate=true]:sm:-translate-y-52 lg:data-[translate=true]:max-w-max lg:data-[translate=true]:p-12"
        data-translate={!!post.thumbnail}
      >
        <article className="prose prose-slate dark:prose-invert lg:prose-xl">
          <Markdown content={post.content} />
        </article>
      </div>
    </div>
  );
}
