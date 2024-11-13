import { PostCard } from "@/components/post-card";
import { getPosts } from "@/data/get-posts";
import type { SupportedLocale } from "@/i18n/supported-locales";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

type HomeProps = {
  params: {
    locale: SupportedLocale;
  };
};

export default async function Home({
  params: { locale },
}: Readonly<HomeProps>) {
  unstable_setRequestLocale(locale);

  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "articles_list" }),
    getPosts(locale),
  ]);

  if (!posts.length) {
    return (
      <section className="flex h-full w-full items-center justify-center">
        <p className="text-center">{t("empty")}</p>
      </section>
    );
  }

  return (
    <section className="m-auto flex h-full w-full max-w-screen-xl flex-col gap-4">
      {React.Children.toArray(
        posts.map(({ slug, title, description, thumbnail }) => (
          <PostCard
            slug={slug}
            title={title}
            description={description}
            thumbnail={thumbnail}
          />
        )),
      )}
    </section>
  );
}
