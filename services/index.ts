import { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface ApiConfig extends Omit<RequestInit, 'body'> {
  baseURL: string;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  data?: unknown;
}

const createApiService = (config: ApiConfig) => {
  const request = async <T>(
    endpoint: string,
    { data, ...customConfig }: RequestOptions = {}
  ): Promise<T> => {
    const headers = {
      'Content-Type': 'application/json',
      ...config.headers,
      ...customConfig.headers,
    };

    const requestConfig: RequestInit = {
      ...config,
      ...customConfig,
      headers,
    };

    if (data) {
      requestConfig.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${config.baseURL}${endpoint}`, requestConfig);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const { status } = response ?? {};
        throw { status ,...errorData};
      };

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    get: <T>(endpoint: string, options?: Omit<RequestOptions, 'data'>) => 
      request<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, data: unknown, options?: RequestOptions) => 
      request<T>(endpoint, { ...options, method: 'POST', data }),
    put: <T>(endpoint: string, data: unknown, options?: RequestOptions) => 
      request<T>(endpoint, { ...options, method: 'PUT', data }),
    delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'data'>) => 
      request<T>(endpoint, { ...options, method: 'DELETE' }),
  };
};

export default createApiService;
  