import { env } from "@/env/env";
import type { IHttpClient } from "@/http/http-client/http-client.types";

export type ApiRole = {
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

export type ApiCertificate = {
  name: string;
  imageUrl: string;
  certificateUrl: string;
};

export type ApiExperience = {
  companyName: string;
  companyImageUrl: string;
  location: string;
  roles: ApiRole[];
};

export type ApiExperienceResponse = {
  experiences: ApiExperience[];
  certificates: ApiCertificate[];
};

interface IExperiencesService {
  getExperiences(locale: string): Promise<ApiExperienceResponse>;
}

export class ExperiencesService implements IExperiencesService {
  private constructor(private httpClient: IHttpClient) {}

  static create(httpClient: IHttpClient): IExperiencesService {
    return new ExperiencesService(httpClient);
  }

  async getExperiences(locale: string): Promise<ApiExperienceResponse> {
    try {
      const { download_url } = await this.httpClient.sendRequest<{
        download_url: string;
      }>(
        `${env.server.GITHUB_API_URL}/felipevgomes10/contents/${locale}/experiences.json`,
      );

      const response = await this.httpClient.sendRequest<any>(download_url);

      return response;
    } catch (err) {
      const error = err as Error;

      throw new Error(`Failed to get experiences: ${error.message}`);
    }
  }
}
