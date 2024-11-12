import { Article } from "@/components/article";
import { getPost } from "@/data/get-post";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  return [];
}

export default function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  return <Article slug={slug} locale={locale} />;
}
