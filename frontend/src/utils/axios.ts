import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { msgsConstants } from "@/constants";
import { apisData, commonData, routesData } from "@/data";
import type { NullableErrorType } from "@/types";

import { deleteCookieHandler, getCookieHandler, setCookieHandler } from "./cookies";

const getLoginUrlWithReturnPathHandler = (): string => {
    const currentPath = window.location.pathname + window.location.search;

    if (currentPath && currentPath !== routesData.login && currentPath !== routesData.home) return `${routesData.login}?returnUrl=${encodeURIComponent(currentPath)}`;

    return routesData.login;
};

export const axiosClient = axios.create({
    baseURL: apisData.baseUrl,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

let isRefreshing = false;

let failedQueue: {
    reject: (reason?: unknown) => void, // eslint-disable-line code-style/prop-naming-convention -- Promise callback
    resolve: (value?: unknown) => void, // eslint-disable-line code-style/prop-naming-convention -- Promise callback
}[] = [];

const processQueueHandler = (error: NullableErrorType, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { headers } = config;

        const token = getCookieHandler(commonData.token.tokenKey);

        if (token && headers) headers[commonData.token.authorizationHeader] = `${commonData.token.bearerPrefix}${token}`;

        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const {
            config,
            message,
            response: {
                data,
                status,
            } = {},
        } = error;

        const originalRequest = config as InternalAxiosRequestConfig & { isRetry?: boolean };

        if (status === 401 && !originalRequest.isRetry) {
            if (originalRequest.url === apisData.refresh) {
                deleteCookieHandler(commonData.token.tokenKey);

                window.location.href = getLoginUrlWithReturnPathHandler();

                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => failedQueue.push({
                    reject,
                    resolve,
                })).then((token) => {
                    if (originalRequest.headers) originalRequest.headers[commonData.token.authorizationHeader] = `${commonData.token.bearerPrefix}${token}`;

                    return axiosClient(originalRequest);
                });
            }

            originalRequest.isRetry = true;

            isRefreshing = true;

            try {
                const tokenResponse = await axiosClient.post<{ token: string }>(apisData.refresh);

                const newToken = tokenResponse.data.token;

                setCookieHandler(
                    commonData.token.tokenKey,
                    newToken,
                );

                processQueueHandler(
                    null,
                    newToken,
                );

                if (originalRequest.headers) originalRequest.headers[commonData.token.authorizationHeader] = `${commonData.token.bearerPrefix}${newToken}`;

                return axiosClient(originalRequest);
            } catch (refreshError) {
                processQueueHandler(
                    refreshError as Error,
                    null,
                );

                deleteCookieHandler(commonData.token.tokenKey);

                window.location.href = getLoginUrlWithReturnPathHandler();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        const errorMessage = (data as { message?: string })?.message || message || msgsConstants.genericError;

        return Promise.reject(new Error(errorMessage));
    },
);
