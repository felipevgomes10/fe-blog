"use client";

import { filterPosts } from "@/utils/filter-posts/filter-posts";
import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo } from "react";
import { PostCard } from "./post-card";

type PostsListProps = {
  posts: Post[];
};

export function PostsList({ posts }: Readonly<PostsListProps>) {
  const search = useSearchParams();
  const q = useDeferredValue(search.get("q") || "");

  const filteredPosts = useMemo(() => filterPosts({ posts, q }), [posts, q]);

  return (
    <section className="m-auto flex h-full w-full max-w-screen-xl flex-col gap-4 pt-1">
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
