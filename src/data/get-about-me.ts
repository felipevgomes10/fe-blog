"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { HttpClientWithResponseAsText } from "@/http/http-client/http-client-with-response-as-text";
import { AboutMeMapper } from "@/http/mappers/about-me-mapper/about-me-mapper";
import { AboutMeService } from "@/http/services/about-me-service/about-me-service";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";

const httpClient = HttpClient.create();
const githubClient = GithubClient.create(httpClient);

const httpClientWithResponseAsText = HttpClientWithResponseAsText.create();
const githubClientWithResponseAsText = GithubClient.create(
  httpClientWithResponseAsText,
);

const aboutMeService = AboutMeService.create(
  githubClient,
  githubClientWithResponseAsText,
);
const aboutMeMapper = AboutMeMapper.create();

export async function getAboutMe() {
  const locale = await getLocale();

  const getCachedAboutMe = unstable_cache(
    (locale: string) => aboutMeService.getAboutMe(locale),
    [locale],
    {
      tags: ["about-me"],
      revalidate: 3600, // Every hour
    },
  );

  const aboutMe = await getCachedAboutMe(locale);
  const mappedAboutMe = aboutMeMapper.map(aboutMe);

  return mappedAboutMe;
}
