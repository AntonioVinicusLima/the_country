export interface HttpResponse<T> {
  data: T;
  status: number;
}

export interface HttpClient {
  get<T>(url: string): Promise<HttpResponse<T>>;
}

export class HttpClientImpl implements HttpClient {
  async get<T>(url: string): Promise<HttpResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status
      };
    } catch (error) {
      throw new Error(
        `Erro na requisição: ${error instanceof Error ? error.message : 'Unknown'}`
      );
    }
  }
}