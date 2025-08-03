import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let jwtToken = null;
let tokenPromise = null;

// Step 1: Fetch the service token
const fetchServiceToken = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/service-token`,
    {
      name: import.meta.env.VITE_SERVICE_NAME,
      secret: import.meta.env.VITE_SERVICE_SECRET,
    }
  );
  jwtToken = response.data.access_token;
  return jwtToken;
};

// Step 2: Attach JWT to all outgoing requests
axiosInstance.interceptors.request.use(async (config) => {
  if (!jwtToken) {
    if (!tokenPromise) {
      tokenPromise = fetchServiceToken();
    }
    jwtToken = await tokenPromise;
    tokenPromise = null;
  }

  config.headers.Authorization = `Bearer ${jwtToken}`;
  return config;
});

// Step 3: Retry once on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      jwtToken = await fetchServiceToken();
      originalRequest.headers.Authorization = `Bearer ${jwtToken}`;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
