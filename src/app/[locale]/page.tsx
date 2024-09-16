import { PostCard } from "@/components/post-card";
import { getPosts } from "@/data/get-posts";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

type HomeProps = {
  params: {
    locale: string;
  };
};

export default async function Home({
  params: { locale },
}: Readonly<HomeProps>) {
  unstable_setRequestLocale(locale);

  const posts = await getPosts();

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
