"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { HttpClientWithResponseAsText } from "@/http/http-client/http-client-with-response-as-text";
import { PostMapper } from "@/http/mappers/post-mapper/post-mapper";
import { PostService } from "@/http/services/post-service/post-service";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";

const httpClient = HttpClient.create();
const githubClient = GithubClient.create(httpClient);

const httpClientWithResponseAsText = HttpClientWithResponseAsText.create();
const githubClientWithResponseAsText = GithubClient.create(
  httpClientWithResponseAsText,
);

const postService = PostService.create(
  githubClient,
  githubClientWithResponseAsText,
);
const postMapper = PostMapper.create();

export async function getPost(slug: string) {
  const locale = await getLocale();

  const getCachedPost = unstable_cache(
    (locale: string, slug: string) => postService.getPost(locale, slug),
    [locale, slug],
    {
      tags: ["post"],
      revalidate: 3600, // Every hour
    },
  );

  const post = await getCachedPost(locale, slug);
  const mappedPost = postMapper.map(post);

  return mappedPost;
}
