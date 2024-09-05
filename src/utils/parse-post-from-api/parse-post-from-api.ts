import { api } from "@/lib/api";

export type APIPost = {
  name: string;
  path: string;
  download_url: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
};

type PostInfo = [string, string, string];

export async function parsePostFromApi({
  name,
  download_url,
}: APIPost): Promise<Post> {
  const slug = getPostSlug(name);

  const response = await api(download_url);
  const content = await response.text();

  const { title, description, thumbnail } = getPostInformation(content);

  return {
    slug,
    title,
    description,
    content,
    thumbnail,
  };
}

function getPostSlug(name: string): string {
  const slug = name.split(".").at(0) as string;

  return slug;
}

function getPostInformation(content: string): Omit<Post, "slug" | "content"> {
  const matchCommentRegexp = /<!--\s*([\s\S]*?)\s*-->/g;
  const matches = Array.from(content.matchAll(matchCommentRegexp));

  const postInformation = matches.map((match) => match.at(1)!.trim());
  const [title, description, thumbnail] = postInformation as PostInfo;

  return { title, description, thumbnail };
}
