import { privateApi } from "./auth";

export const getProfile = async () => {
  try {
    const response = await privateApi.get("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: any) => {
  try {
    const response = await privateApi.patch("/users/me", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationSettings = async (data: any) => {
  try {
    const response = await privateApi.patch("/users/me/notify-settings", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCaloriesAndTimeRecommendation = async () => {
  try {
    const response = await privateApi.post("/users/me/recommend");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startGoal = async () => {
  try {
    const response = await privateApi.post("/users/goal/start");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGoalStatus = async (status: string) => {
  try {
    const response = await privateApi.patch("/users/goal/status", { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const banUser = async (userId: string) => {
  try {
    const response = await privateApi.patch(`/users/ban/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unbanUser = async (userId: string) => {
  try {
    const response = await privateApi.patch(`/users/unban/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHealthActivity = async (type: string, date: string) => {
  try {
    const response = await privateApi.get(
      `/users/health-tracking?type=${type}&date=${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWaterIntake = async (
  date: string,
  goal: number,
  step: number
) => {
  try {
    const response = await privateApi.post("/users/waters", {
      date,
      goal,
      step,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addHealthTracking = async (
  data: string,
  type: string,
  value: number,
  target: number
) => {
  try {
    const response = await privateApi.post("/users/health-tracking", {
      data,
      type,
      value,
      target,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addHealthTrackingDetails = async (input: any) => {
  try {
    const response = await privateApi.post(
      "/users/health-tracking-details",
      input
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const response = await privateApi.post("/users/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
