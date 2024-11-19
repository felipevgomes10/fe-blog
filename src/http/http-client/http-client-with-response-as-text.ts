import type { IHttpClient } from "./http-client.types";

export class HttpClientWithResponseAsText implements IHttpClient {
  private constructor() {}

  static create(): IHttpClient {
    return new HttpClientWithResponseAsText();
  }

  async sendRequest<TResponse>(
    url: string,
    options?: RequestInit,
  ): Promise<TResponse> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url} with status ${response.status}`,
        );
      }

      return response.text() as unknown as TResponse;
    } catch (err) {
      const error = err as Error;

      throw new Error(error.message);
    }
  }
}
