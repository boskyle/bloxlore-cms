import axios from "axios";

const creatorClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

creatorClient.interceptors.request.use((config) => {
  console.log(
    `[creatorClient] ${config.method?.toUpperCase()} → ${config.baseURL}${
      config.url
    }`
  );
  return config;
});

export default creatorClient;
