"use client";

import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useRef } from "react";
import { PostCard } from "./post-card";
import { Input } from "./ui/input";

type PostsListProps = {
  posts: Post[];
};

export function PostsList({ posts }: Readonly<PostsListProps>) {
  const t = useTranslations("posts_list");

  const inputRef = useRef<HTMLInputElement>(null);

  const search = useSearchParams();
  const q = useDeferredValue(search.get("q") || "");

  const router = useRouter();
  const pathname = usePathname();

  const filteredPosts = useMemo(() => {
    return posts.filter(({ title }) => {
      return title.toLowerCase().includes(q.toLowerCase());
    });
  }, [posts, q]);

  function handleSearch() {
    const search = new URLSearchParams();
    search.set("q", inputRef.current?.value || "");

    router.push(`${pathname}?${search.toString()}`);
  }

  return (
    <section className="m-auto flex h-full w-full max-w-screen-xl flex-col gap-4">
      <Input
        className="max-w-96"
        placeholder={t("search_placeholder")}
        ref={inputRef}
        onChange={handleSearch}
      />
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