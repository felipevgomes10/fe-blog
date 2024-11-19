import { env } from "@/env/env";
import type { IHttpClient } from "@/http/http-client/http-client.types";

export type APIPost = {
  name: string;
  path: string;
  download_url: string;
};

type IPostServiceResponse = {
  name: string;
  content: string;
};

interface IPostService {
  getPost(locale: string, slug: string): Promise<IPostServiceResponse>;
  getPosts(locale: string): Promise<IPostServiceResponse[]>;
}

export class PostService implements IPostService {
  private constructor(
    private httpClient: IHttpClient,
    private httpClientWithResponseAsText: IHttpClient,
  ) {}

  static create(
    httpClient: IHttpClient,
    httpClientWithResponseAsText: IHttpClient,
  ): IPostService {
    return new PostService(httpClient, httpClientWithResponseAsText);
  }

  async getPost(locale: string, slug: string): Promise<IPostServiceResponse> {
    try {
      const { name, download_url } = await this.httpClient.sendRequest<APIPost>(
        `${env.server.GITHUB_API_URL}/fe-blog-posts/contents/posts/${locale}/${slug}.md`,
      );

      const content =
        await this.httpClientWithResponseAsText.sendRequest<string>(
          download_url,
        );

      return { name, content };
    } catch (err) {
      const error = err as Error;

      throw new Error(`Failed to get about me: ${error.message}`);
    }
  }

  async getPosts(locale: string): Promise<IPostServiceResponse[]> {
    try {
      const response = await this.httpClient.sendRequest<APIPost[]>(
        `${env.server.GITHUB_API_URL}/fe-blog-posts/contents/posts/${locale}`,
      );

      const posts = await Promise.all(
        response.map(async ({ name, download_url }) => {
          const content =
            await this.httpClientWithResponseAsText.sendRequest<string>(
              download_url,
            );

          return { name, content };
        }),
      );

      return posts;
    } catch (err) {
      const error = err as Error;

      throw new Error(`Failed to get about me: ${error.message}`);
    }
  }
}
