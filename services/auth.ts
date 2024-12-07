import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.BASE_URL,
});
const privateApi = axios.create({
  baseURL: process.env.BASE_URL,
});

publicApi.interceptors.request.use((config) => {
  config.headers.Authorization = undefined;
  return config;
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(email: string, password: string) {
    const response = await publicApi.post("/api/auth/login", {
      email: email,
      password: password,
    });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return response.data;
  },
  async logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  async register(email: string, password: string) {
    const response = await publicApi.post("/api/auth/register", {
      email: email,
      password: password,
    });
    return response.data;
  },
};

export { publicApi, privateApi };
