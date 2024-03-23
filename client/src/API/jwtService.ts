import { LogInValueProps } from "../types/Types";
import api from "./API";
import apiEndpoint from "./jwtConfig";

export default class JwtService {
  alreadyFetchingAccessToken = false;
  user = [];
  jwtConfig = { ...apiEndpoint };
  constructor() {
    // request
    api.interceptors.request.use(
      async (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //response
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error;
        const originalRequest = config;
        if (response && response.status === 401) {
          console.log("ok");
          if (!this.alreadyFetchingAccessToken) {
            this.alreadyFetchingAccessToken = true;
            try {
              const r = await this.getRefreshToken();
              this.alreadyFetchingAccessToken = false;
              this.setAccessToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);
              this.onAccessTokenFetched(r.data.accessToken);
              // Retry the original request
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${r.data.accessToken}`;
              return api(originalRequest);
            } catch (e) {
              this.alreadyFetchingAccessToken = false;
              return Promise.reject(e);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.user.forEach((callback) => callback(accessToken));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addSubscriber(callback: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.user.push(callback);
  }

  async getRefreshToken() {
    try {
      const response = await api.post(
        this.jwtConfig.refreshTokenEndPoint,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getAccessToken() {
    return localStorage.getItem(this.jwtConfig.accessTokenKey);
  }

  setAccessToken(value: string) {
    localStorage.setItem(this.jwtConfig.accessTokenKey, value);
  }

  setRefreshToken(value: string) {
    localStorage.setItem(this.jwtConfig.refreshTokenKey, value);
  }

  logIn(data: LogInValueProps) {
    return api.post(this.jwtConfig.login, data, { withCredentials: true });
  }

  test() {
    return api.post("/test-request", {}, { withCredentials: true });
  }
}
