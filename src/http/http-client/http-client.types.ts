export interface IHttpClient {
  sendRequest: <TResponse>(
    url: string,
    options?: RequestInit,
  ) => Promise<TResponse>;
}
