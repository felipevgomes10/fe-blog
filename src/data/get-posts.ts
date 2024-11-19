"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { HttpClientWithResponseAsText } from "@/http/http-client/http-client-with-response-as-text";
import { PostMapper } from "@/http/mappers/post-mapper/post-mapper";
import { PostService } from "@/http/services/post-service/post-service";
import { defaultLocale, type SupportedLocale } from "@/i18n/supported-locales";

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
  const posts = await postService.getPosts(locale);
  const mappedPosts = posts.map(postMapper.map);

  return mappedPosts;
}
