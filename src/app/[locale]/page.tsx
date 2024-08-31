import { PostCard } from "@/components/post-card";
import { env } from "@/env/env";
import {
  parsePostFromApi,
  type APIPost,
} from "@/utils/parse-post-from-api/parse-post-from-api";
import { getLocale } from "next-intl/server";
import React from "react";

async function getPosts() {
  const locale = await getLocale();

  const response = await fetch(`${env.server.GITHUB_API_URL}/${locale}`, {
    cache: "force-cache",
    next: { revalidate: 300 },
  });
  const posts: APIPost[] = await response.json();

  return Promise.all(posts.map(parsePostFromApi));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <section className="flex flex-col gap-4 max-w-screen-xl m-auto w-full h-full">
      {React.Children.toArray(
        posts.map(({ slug, title, description, thumbnail }) => (
          <PostCard
            slug={slug}
            title={title}
            description={description}
            thumbnail={thumbnail}
          />
        ))
      )}
    </section>
  );
}
