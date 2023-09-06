import axios, { AxiosError, AxiosInstance } from "axios";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "../storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInteceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.0.71:3333",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInteceptTokenManager = (signOut) => {
  const inteceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });
              await storageAuthTokenSave(data.token, data.refresh_token);

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => request.onSuccess(data.token));

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => request.onFailure(error));

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      // error not related to token
      if (requestError.response && requestError.response.data) {
        return Promise.reject(console.log(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(inteceptTokenManager);
  };
};

export default api;
