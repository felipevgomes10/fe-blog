"use server";

import { env } from "@/env/env";
import { api } from "@/lib/api";
import {
  parseAboutMeFromApi,
  type APIAboutMe,
} from "@/utils/parse-about-me-from-api/parse-about-me-from-api";
import { getLocale } from "next-intl/server";

export async function getAboutMe() {
  const locale = await getLocale();

  const response = await api(
    `${env.server.GITHUB_API_URL}/felipevgomes10/contents/${locale}/about-me.md`,
  );

  if (response.status === 404) return null;

  const aboutMe: APIAboutMe = await response.json();

  const parsedPost = parseAboutMeFromApi(aboutMe);

  return parsedPost;
}
