import { PostCard } from "@/components/post-card";
import React from "react";

export default function Home() {
  return (
    <section className="flex flex-col gap-4 max-w-screen-xl m-auto w-full h-full">
      {React.Children.toArray(
        Array.from({ length: 20 }, () => ({
          slug: "slug",
          title: "Post",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam officia ad odio facere vel quia officiis ullam vero nesciunt sequi animi ex, molestiae rerum optio eligendi perspiciatis. Rerum, necessitatibus quis?",
          thumbnail: "https://picsum.photos/1000/1000",
        })).map((post, index) => (
          <PostCard
            slug={post.slug}
            title={`${post.title} ${index + 1}`}
            description={post.description}
            thumbnail={post.thumbnail}
          />
        ))
      )}
    </section>
  );
}
