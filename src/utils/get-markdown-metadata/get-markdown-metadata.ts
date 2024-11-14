export function getMarkdownMetadata(content: string) {
  const matchCommentRegexp = /<!--\s*([\s\S]*?)\s*-->/g;
  const matches = Array.from(content.matchAll(matchCommentRegexp));

  const metadata = matches.map((match) => match.at(1)!.trim());

  return metadata;
}
