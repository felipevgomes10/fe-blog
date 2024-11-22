"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { ExperiencesMapper } from "@/http/mappers/experiences-mapper/experiences-mapper";
import { ExperiencesService } from "@/http/services/experiences-service/experiences-service";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";

const httpClient = HttpClient.create();
const githubClient = GithubClient.create(httpClient);

const experiencesService = ExperiencesService.create(githubClient);
const experiencesMapper = ExperiencesMapper.create();

export async function getExperiences() {
  const locale = await getLocale();

  const getCachedExperiences = unstable_cache(
    (locale: string) => experiencesService.getExperiences(locale),
    [locale],
    {
      tags: ["experiences"],
      revalidate: 3600, // Every hour
    },
  );

  const experiences = await getCachedExperiences(locale);
  const mappedExperiences = experiencesMapper.map(experiences);

  return mappedExperiences;
}
