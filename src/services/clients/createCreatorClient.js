// src/services/clients/createCreatorClient.js

import axios from "axios";

// Singleton + factory to create a custonm axis creator client
let creatorClient = null;

export const createCreatorClient = (store) => {
  if (creatorClient) return creatorClient;

  creatorClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  // 🔐 Attach token to all requests
  creatorClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(
        `[creatorClient] ${config.method?.toUpperCase()} → ${config.baseURL}${
          config.url
        }`
      );
    }

    return config;
  });

  // 🛡 Handle 401 Unauthorized with token refresh and retry
  creatorClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { ensureValidToken } = await import("@store/slices/authSlice");
          const newToken = await store.dispatch(ensureValidToken()).unwrap();

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return creatorClient(originalRequest); // Retry with new token
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return creatorClient;
};
