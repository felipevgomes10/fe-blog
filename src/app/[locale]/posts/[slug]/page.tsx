import { Article } from "@/components/article";
import { getPost } from "@/data/get-post";
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
    getTranslations({ locale, namespace: "metadata" }),
    getPost(slug),
  ]);

  return {
    title: `${t("title")} - ${post.title}`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return [];
}

export default function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  unstable_setRequestLocale(locale);

  return <Article slug={slug} locale={locale} />;
}
