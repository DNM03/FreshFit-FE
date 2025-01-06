import axios from "axios";
import { router } from "expo-router";
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
  baseURL: process.env.LOCAL_URL,
});

const privateApi = axios.create({
  baseURL: process.env.LOCAL_URL,
});

publicApi.interceptors.request.use((config) => {
  config.headers.Authorization = undefined;
  return config;
});

privateApi.interceptors.request.use(async (config) => {
  const token = await getItem<string>("accessToken");
  if (token) {
    console.log("Token:", token);
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
          refresh_token: refreshToken,
        });

        console.log("token", response);

        await setItem("accessToken", response.data.result.access_token);
        await setItem("refreshToken", response.data.result.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${response.data.result.access_token}`;
        return privateApi(originalRequest);
      } catch (err) {
        await removeItem("accessToken");
        await removeItem("refreshToken");

        if (Platform.OS === "web") {
          window.location.href = "/login";
        } else {
          // Implement your React Native navigation here
          console.log("Redirect to login screen");
          router.replace("/auth/login");
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await publicApi.post("/users/login", {
        email_or_username: email,
        password,
      });

      // Store all auth data
      await setItem("accessToken", response.data.result.access_token);
      await setItem("refreshToken", response.data.result.refresh_token);

      return response.data;
    } catch (e: any) {
      console.log("error", e?.message);
      throw e;
    }
  },

  async logout() {
    // await privateApi.post("/users/logout");
    await removeItem("accessToken");
    await removeItem("refreshToken");
  },

  async register(username: string, email: string, password: string) {
    const response = await publicApi.post("/users/register", {
      username,
      email,
      password,
      confirm_password: password,
    });
    // Store all auth data
    await setItem("accessToken", response.data.result.access_token);
    await setItem("refreshToken", response.data.result.refresh_token);

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
    await setItem("refreshToken", response.data.result.refresh_token);
    return response.data;
  },
  async verifyEmail(email: string, otpCode: string) {
    const response = await publicApi.post("/users/verify-email", {
      email,
      otp_code: otpCode,
    });
    return response.data;
  },
  async resendVerificationEmail(email: string) {
    const response = await publicApi.post("/users/resend-verify-email", {
      email,
    });
    return response.data;
  },
  async verifyOtp(otp: string, email: string) {
    console.log("OTP", otp, email);
    const response = await publicApi.post("/users/verify-otp-code", {
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
      forgot_password_token: forgotPasswordToken,
      password: newPassword,
      confirm_password: confirmPassword,
    });
    return response.data;
  },
  async forgotPassword(email: string) {
    const response = await publicApi.post("/users/forgot-password", {
      email,
    });
    return response.data;
  },
  async updateInfo({
    username,
    fullName,
    date_of_birth,
    gender, // 0 - Male, 1 - Female
    avatar,
    height,
    weight,
    goal_weight,
    level, // 0 - Beginner, 1 - Intermediate, 2 - Advanced,
    activityLevel,
  }: {
    username?: string;
    fullName?: string;
    date_of_birth?: string;
    gender?: number;
    avatar?: string;
    height?: number;
    weight?: number;
    goal_weight?: number;
    level?: number;
    activityLevel?: string;
  }) {
    const object: Record<string, any> = {};

    // Loop through arguments and only include those with a defined value
    Object.entries({
      username,
      fullName,
      date_of_birth,
      gender,
      avatar,
      height,
      weight,
      goal_weight,
      level,
      activityLevel,
    }).forEach(([key, value]) => {
      if (value !== undefined) {
        object[key] = value;
      }
    });

    const response = await privateApi.patch("/users/me", object);
    return response.data;
  },
  async changePassword(
    old_password: string,
    new_password: string,
    confirm_password: string
  ) {
    const response = await privateApi.put("/users/change-password", {
      old_password,
      new_password,
      confirm_password,
    });
    return response.data;
  },
};

export { publicApi, privateApi };
