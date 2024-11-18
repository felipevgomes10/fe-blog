"use server";

import { env } from "@/env/env";
import { api } from "@/lib/api";
import {
  type ApiExperience,
  parseExperiencesFromApi,
} from "@/utils/parse-experiences-from-api/parse-experiences-from-api";
import { getLocale } from "next-intl/server";

export async function getExperiences() {
  const locale = await getLocale();

  const response = await api(
    `${env.server.GITHUB_API_URL}/felipevgomes10/contents/${locale}/experiences.json`,
  );

  if (response.status === 404) return null;

  const experiences: ApiExperience = await response.json();

  const parsedExperiences = parseExperiencesFromApi(experiences);

  return parsedExperiences;
}
