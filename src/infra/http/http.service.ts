import axios, { AxiosRequestConfig, AxiosInstance, Method } from 'axios';
import { Http, HttpConfig, HttpResponse } from '@/infra/http/ports';
import { injectable } from 'tsyringe';

@injectable()
export class HttpService implements Http {
  private instance: AxiosInstance;

  get<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.get(url, this.loadConfigs(config));
  }

  post<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.post(url, data, this.loadConfigs(config));
  }

  delete<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.delete(url, this.loadConfigs(config));
  }

  patch<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.patch(url, data, this.loadConfigs(config));
  }

  createInstance(config: HttpConfig): void {
    this.instance = axios.create({
      ...this.loadConfigs(config),
    });
  }

  protected loadConfigs(config?: HttpConfig): AxiosRequestConfig {
    if (!config) {
      return {};
    }
    const { baseURL, data, headers, method, params, timeout, url } = config;
    const castedMethod = method as Method;

    return {
      url,
      method: castedMethod,
      baseURL,
      headers,
      params,
      data,
      timeout,
    };
  }
}
