export type APIPost = {
  name: string;
  path: string;
  download_url: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
};

type PostInfo = [string, string, string];

export async function parsePostFromApi({
  name,
  download_url,
}: APIPost): Promise<Post> {
  const slug = name.split(".").at(0) as string;

  const response = await fetch(download_url);
  const content = await response.text();

  const matchCommentRegexp = /<!--\s*([\s\S]*?)\s*-->/g;
  const matches = Array.from(content.matchAll(matchCommentRegexp));

  const postInformation = matches.map((match) => match.at(1)!.trim());
  const [title, description, thumbnail] = postInformation as PostInfo;

  return {
    slug,
    title,
    description,
    thumbnail,
  };
}
