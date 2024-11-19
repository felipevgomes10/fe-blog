import type { MappedPost } from "@/http/mappers/post-mapper/post-mapper";

type FilterPostsParams = {
  posts: MappedPost[];
  q: string;
};

export function filterPosts({ posts = [], q }: FilterPostsParams) {
  const filteredPosts = posts.filter(({ title }) => {
    return title.toLowerCase().includes(q.toLowerCase());
  });

  return filteredPosts;
}
