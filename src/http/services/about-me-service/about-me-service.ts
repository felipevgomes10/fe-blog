import { env } from "@/env/env";
import type { IHttpClient } from "@/http/http-client/http-client.types";

type APIAboutMe = {
  download_url: string;
};

interface IAboutMeService {
  getAboutMe(locale: string): Promise<string>;
}

export class AboutMeService implements IAboutMeService {
  private constructor(
    private httpClient: IHttpClient,
    private httpClientWithResponseAsText: IHttpClient,
  ) {}

  static create(
    httpClient: IHttpClient,
    httpClientWithResponseAsText: IHttpClient,
  ): IAboutMeService {
    return new AboutMeService(httpClient, httpClientWithResponseAsText);
  }

  async getAboutMe(locale: string): Promise<string> {
    try {
      const { download_url } = await this.httpClient.sendRequest<APIAboutMe>(
        `${env.server.GITHUB_API_URL}/felipevgomes10/contents/${locale}/about-me.md`,
      );

      const response =
        await this.httpClientWithResponseAsText.sendRequest<string>(
          download_url,
        );

      return response;
    } catch (err) {
      const error = err as Error;

      throw new Error(`Failed to get about me: ${error.message}`);
    }
  }
}
