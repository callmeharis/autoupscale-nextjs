import axios, { AxiosRequestConfig } from "axios";
import * as https from "https";
// import { useToken } from "../../hooks/use-auth";
import { isBrowser } from "../../utils/common";
import { getToken } from "../../utils/token.helper";
import { useUserContext } from '@/context/user-context'
import { toast } from 'react-toastify'

axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error: any) {
      if (error.response.statusText == 'Unauthorized') {
        toast.error("Session expired login again")
        window.localStorage.removeItem('user');
        // const userContext = useUserContext();
        // userContext.setUser(null);
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export default class BaseApi {
    private mergeRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
        if (!config) config = {};

        if (!config.baseURL) config.baseURL = `${process.env.BACKEND_BASE_URL}/api`;

        // const { getToken } = useToken();
        const token = getToken();

        if (false && !isBrowser()) {
            config.httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
        }

        if (!config.headers) config.headers = {};

        if (token && !config.headers.Authorization)
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    }

    async post(url: string, body: any, config?: AxiosRequestConfig) {
        config = this.mergeRequestConfig(config);

        return axios.post(url, body, config);
    }

    async get(url: string, config?: AxiosRequestConfig) {
        config = this.mergeRequestConfig(config);

        return axios.get(url, config);
    }

    async patch(url: string, body: any, config?: AxiosRequestConfig) {
        config = this.mergeRequestConfig(config);

        return axios.patch(url, body, config);
    }

    async put(url: string, body: any, config?: AxiosRequestConfig) {
        config = this.mergeRequestConfig(config);

        return axios.put(url, body, config);
    }

    async delete(url: string, body?: any, config?: AxiosRequestConfig) {
        config = this.mergeRequestConfig(config);
        if (body) config.data = body;

        return axios.delete(url, config);
    }

    buildUrl(url: string, params?: any): string {
        return `${url}${this.buildQueryString(params)}`;
    }

    buildQueryString(params: any): string {
        let qs = "";

        const seperator = "&";

        if (params) {
            qs = Object.entries(params)
                .filter(([key, value]) => value != null)
                .map((v) => {
                    let [key, value] = v;
                    switch (typeof value) {
                        case "undefined":
                            value = null;
                        case "object":
                            if (value instanceof Date) {
                                value = value.toISOString();
                            } else if (value instanceof Array) {
                                return `${key}=${value.map((v) => encodeURIComponent(v)).join(",")}`;
                            } else {
                                throw new Error("Object is unsupported by this parser");
                            }
                            break;
                    }

                    return `${key}=${encodeURIComponent(value as string)}`;
                })
                .join(seperator);
        }

        return qs ? "?" + qs : qs;
    }
}
