import { PostsList } from "@/components/posts-list";
import { getPosts } from "@/data/get-posts";
import type { SupportedLocale } from "@/i18n/supported-locales";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type Params = Promise<{ locale: SupportedLocale }>;

type HomeProps = {
  params: Params;
};

export default async function Home({ params }: Readonly<HomeProps>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "posts_list" }),
    getPosts(locale),
  ]);

  if (!posts.length) {
    return (
      <section className="m-auto flex h-full min-h-[calc(100dvh_-_208px)] w-full max-w-screen-xl flex-col gap-4 pt-1">
        <p className="m-auto text-gray-500 dark:text-gray-400">
          {t("empty")} {":("}
        </p>
      </section>
    );
  }

  return (
    <Suspense>
      <PostsList posts={posts} />
    </Suspense>
  );
}
