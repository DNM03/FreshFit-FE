import { privateApi } from "./auth";

export const addWorkoutPlanDetail = async (
  data: any,
  workoutPlanId: string
) => {
  try {
    const response = await privateApi.post(
      `/workout-plan-details/${workoutPlanId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkoutPlanDetail = async (
  workoutPlanId: string,
  id: string
) => {
  try {
    const response = await privateApi.delete(
      `/workout-plan-details/${workoutPlanId}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkoutPlanDetail = async (
  workoutPlanId: string,
  id: string,
  data: any
) => {
  try {
    const response = await privateApi.patch(
      `/workout-plan-details/${workoutPlanId}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorkoutPlanDetailById = async (
  workoutPlanId: string,
  id: string
) => {
  try {
    const response = await privateApi.get(
      `/workout-plan-details/${workoutPlanId}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchWorkoutPlanDetail = async (
  workoutPlanId: string,
  status?: string,
  week?: number
) => {
  try {
    const response = await privateApi.get(
      `/workout-plan-details/${workoutPlanId}?${
        status ? `&status=${status}` : ""
      }${week ? `&week=${week}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSet = async (data: any, workoutPlanId: string, id: string) => {
  try {
    const response = await privateApi.post(
      `/workout-plan-details/${workoutPlanId}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSet = async (setId: string, data: any) => {
  try {
    const response = await privateApi.patch(`/sets/${setId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSet = async (
  workoutPlanId: string,
  id: string,
  setId: string
) => {
  try {
    const response = await privateApi.delete(
      `/workout-plan-details/${workoutPlanId}/${id}/${setId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
