"use client";

import type { MappedPost } from "@/http/mappers/post-mapper/post-mapper";
import { filterPosts } from "@/utils/filter-posts/filter-posts";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo } from "react";
import { PostCard } from "./post-card";

type PostsListProps = {
  posts: MappedPost[];
};

export function PostsList({ posts }: Readonly<PostsListProps>) {
  const search = useSearchParams();
  const q = useDeferredValue(search.get("q") || "");

  const t = useTranslations();

  const filteredPosts = useMemo(() => filterPosts({ posts, q }), [posts, q]);

  return (
    <section className="m-auto flex h-full min-h-[calc(100dvh_-_208px)] w-full max-w-screen-xl flex-col gap-4 pt-1">
      {!filteredPosts.length && (
        <p className="m-auto text-gray-500 dark:text-gray-400">
          {t("app_header.empty")} {":("}
        </p>
      )}
      {q && Boolean(filteredPosts.length) && (
        <p className="text-gray-500 dark:text-gray-400">
          {t("posts_list.search_results")} ({filteredPosts.length})
        </p>
      )}
      {filteredPosts.map(({ slug, title, description, thumbnail }) => (
        <PostCard
          key={slug}
          slug={slug}
          title={title}
          description={description}
          thumbnail={thumbnail}
        />
      ))}
    </section>
  );
}
