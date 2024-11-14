import { api } from "@/lib/api";
import { getMarkdownMetadata } from "../get-markdown-metadata/get-markdown-metadata";

export type APIAboutMe = {
  download_url: string;
};

type AboutMe = {
  profile: string;
  content: string;
};

type AboutMeInfo = [string];

export async function parseAboutMeFromApi({
  download_url,
}: APIAboutMe): Promise<AboutMe> {
  const response = await api(download_url);
  const content = await response.text();

  const { profile } = getAboutMeInformation(content);

  return { profile, content };
}

function getAboutMeInformation(content: string): AboutMe {
  const aboutMeInformation = getMarkdownMetadata(content);
  const [profile] = aboutMeInformation as AboutMeInfo;

  return { profile, content };
}
