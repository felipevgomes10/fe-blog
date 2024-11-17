import type { Post } from "../parse-post-from-api/parse-post-from-api";

type FilterPostsParams = {
  posts: Post[];
  q: string;
};

export function filterPosts({ posts = [], q }: FilterPostsParams) {
  const filteredPosts = posts.filter(({ title }) => {
    return title.toLowerCase().includes(q.toLowerCase());
  });

  return filteredPosts;
}
