import axios, { AxiosInstance } from "axios";

export class ApiClient {
  private static instance: AxiosInstance;

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create();
      ApiClient.instance.interceptors.response.use(
        res => {
          if (res.status === 200) {
            return res.data;
          } else {
            return Promise.reject(res);
          }
        },
        error => {
          return Promise.reject(error);
        }
      );

      //TODO: Set Base API URL from environment file
      ApiClient.setBaseURL(" https://api.neds.com.au/rest/v1/");
    }
    return ApiClient.instance;
  }

  static setBaseURL(url: string) {
    const instance = ApiClient.getInstance();
    instance.defaults.baseURL = url;
  }
}
