import { getMarkdownMetadata } from "@/utils/get-markdown-metadata/get-markdown-metadata";

type MappedAboutMe = {
  profile: string;
  content: string;
};

type AboutMeInfo = [string];

interface IAboutMeMapper {
  map: (content: string) => Promise<MappedAboutMe>;
}

export class AboutMeMapper implements IAboutMeMapper {
  private constructor() {}

  public static create(): IAboutMeMapper {
    return new AboutMeMapper();
  }

  async map(content: string): Promise<MappedAboutMe> {
    const { profile } = this.getAboutMeInformation(content);

    return { profile, content };
  }

  private getAboutMeInformation(content: string): MappedAboutMe {
    const aboutMeInformation = getMarkdownMetadata(content);
    const [profile] = aboutMeInformation as AboutMeInfo;

    return { profile, content };
  }
}
