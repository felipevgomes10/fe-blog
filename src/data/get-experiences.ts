"use server";

import { GithubClient } from "@/http/github-client/github-client";
import { HttpClient } from "@/http/http-client/http-client";
import { ExperiencesMapper } from "@/http/mappers/experiences-mapper/experiences-mapper";
import { ExperiencesService } from "@/http/services/experiences-service/experiences-service";
import { getLocale } from "next-intl/server";

const httpClient = HttpClient.create();
const githubClient = GithubClient.create(httpClient);

const experiencesService = ExperiencesService.create(githubClient);
const experiencesMapper = ExperiencesMapper.create();

export async function getExperiences() {
  const locale = await getLocale();

  const experiences = await experiencesService.getExperiences(locale);
  const mappedExperiences = experiencesMapper.map(experiences);

  return mappedExperiences;
}
