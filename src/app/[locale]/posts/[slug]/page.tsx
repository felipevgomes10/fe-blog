import { Article } from "@/components/article";
import { getPost } from "@/data/get-post";
import { getPosts } from "@/data/get-posts";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Params = {
  locale: string;
  slug: string;
};

type GenerateMetadata = {
  params: Params;
};

type PostProps = {
  params: Params;
};

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

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(({ slug }) => ({ params: { slug } }));
}

export default function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  unstable_setRequestLocale(locale);

  return <Article slug={slug} locale={locale} />;
}
