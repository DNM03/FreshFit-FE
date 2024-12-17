import axios from "axios";
import { Platform } from "react-native";
import { getItem, setItem, removeItem } from "~/utils/async-storage";

// Types
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse extends AuthTokens {
  user: any; // Define user type as needed
}

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

privateApi.interceptors.request.use(async (config) => {
  const token = await getItem<string>("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getItem<string>("refreshToken");
        const response = await axios.post("/users/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        await setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } catch (err) {
        await removeItem("accessToken");
        await removeItem("refreshToken");

        if (Platform.OS === "web") {
          window.location.href = "/login";
        } else {
          // Implement your React Native navigation here
          console.log("Redirect to login screen");
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(email: string, password: string) {
    const response = await publicApi.post("/users/login", {
      email_or_username: email,
      password,
    });

    // Store all auth data
    await setItem("accessToken", response.data.result.access_token);
    await setItem("refreshToken", response.data.result.refresh_token);

    return response.data;
  },

  async logout() {
    await privateApi.post("/users/logout");
    await removeItem("accessToken");
    await removeItem("refreshToken");
  },

  async register(email: string, password: string) {
    const response = await publicApi.post("/users/register", {
      email,
      password,
    });
    return response.data;
  },

  async getAuthStatus() {
    const [accessToken] = await Promise.all([getItem<string>("accessToken")]);

    return {
      isAuthenticated: !!accessToken,
    };
  },

  async refreshSession() {
    const refreshToken = await getItem<string>("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post("/users/refresh-token", {
      refreshToken,
    });

    await setItem("accessToken", response.data.accessToken);
    return response.data;
  },
  async verifyEmail(verifyEmailToken: string) {
    const response = await publicApi.post("/users/verify-email", {
      verifyEmailToken,
    });
    return response.data;
  },
  async resendVerificationEmail() {
    const response = await privateApi.post("/users/resend-verify-email");
    return response.data;
  },
  async verifyOtp(otp: string, email: string) {
    const response = await publicApi.post("/users/verify-otp", {
      email,
      otp_code: otp,
    });
    return response.data;
  },
  async submitEmailToResetPassword(email: string) {
    const response = await publicApi.post("/users/forgot-password", {
      email,
    });
    return response.data;
  },
  async resetPassword(
    forgotPasswordToken: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const response = await publicApi.post("/users/reset-password", {
      forgotPasswordToken,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },
};

export { publicApi, privateApi };
