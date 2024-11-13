import { Article } from "@/components/article";
import { getPost } from "@/data/get-post";
import { getPosts } from "@/data/get-posts";
import {
  supportedLocales,
  type SupportedLocale,
} from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

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
  const postsMap = await Promise.all(
    supportedLocales.map(async (locale) => ({
      locale,
      posts: await getPosts(locale),
    })),
  );

  const params = postsMap.flatMap(({ locale, posts }) => {
    const postByLocaleParams = posts.map((post) => ({
      locale,
      slug: post.slug,
    }));

    return postByLocaleParams;
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
      title: t("article.not_found.title"),
      description: t("article.not_found.message"),
    };
  }

  return {
    title: `${t("metadata.title")} - ${post.title}`,
    description: post.description,
  };
}

export default function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  unstable_setRequestLocale(locale);

  return <Article slug={slug} locale={locale} />;
}
