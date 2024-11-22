import { env } from "@/env/env";
import type { IHttpClient } from "@/http/http-client/http-client.types";

export class GithubClient implements IHttpClient {
  private constructor(private httpClient: IHttpClient) {}

  static create(httpClient: IHttpClient): IHttpClient {
    return new GithubClient(httpClient);
  }

  async sendRequest<TResponse>(
    url: string,
    options?: RequestInit,
  ): Promise<TResponse> {
    try {
      const headers = {
        ...options?.headers,
        Authorization: `Bearer ${env.server.GITHUB_TOKEN}`,
      };

      const response = await this.httpClient.sendRequest<TResponse>(url, {
        ...options,
        headers,
      });

      return response;
    } catch (err) {
      const error = err as Error;

      throw new Error(`Failed to send request to Github API: ${error.message}`);
    }
  }
}
