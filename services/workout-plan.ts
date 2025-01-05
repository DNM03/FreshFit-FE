import { privateApi } from "./auth";

export const addWorkoutPlan = async (data: any) => {
  try {
    const response = await privateApi.post("/workout-plans", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkoutPlan = async (workoutPlanId: string, data: any) => {
  try {
    const response = await privateApi.patch(
      `/workout-plans/${workoutPlanId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkoutPlan = async (workoutPlanId: string) => {
  try {
    const response = await privateApi.delete(`/workout-plans/${workoutPlanId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorkoutPlanById = async (workoutPlanId: string) => {
  try {
    const response = await privateApi.get(`/workout-plans/${workoutPlanId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchWorkoutPlan = async (
  search: string,
  page?: number,
  limit?: number,
  status?: string,
  source?: string,
  type?: string,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/workout-plans?search=${search}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${status ? `&status=${status}` : ""}${
        source ? `&source=${source}` : ""
      }${type ? `&type=${type}` : ""}${sort_by ? `&sort_by=${sort_by}` : ""}${
        order_by ? `&order_by=${order_by}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedWorkoutPlans = async (data: any) => {
  try {
    const response = await privateApi.post("/recommends/workout-plans", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
