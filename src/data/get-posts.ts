"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { HttpClientWithResponseAsText } from "@/http/http-client/http-client-with-response-as-text";
import { PostMapper } from "@/http/mappers/post-mapper/post-mapper";
import { PostService } from "@/http/services/post-service/post-service";
import { defaultLocale, type SupportedLocale } from "@/i18n/supported-locales";
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

export async function getPosts(locale: SupportedLocale = defaultLocale) {
  const getCachedPosts = unstable_cache(
    (locale: string) => postService.getPosts(locale),
    [locale],
    {
      tags: ["posts"],
      revalidate: 3600, // Every hour
    },
  );

  const posts = await getCachedPosts(locale);
  const mappedPosts = posts.map(postMapper.map);

  return mappedPosts;
}
