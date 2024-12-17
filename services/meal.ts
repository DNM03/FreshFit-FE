import { privateApi } from "./auth";

export const addNewMealPlan = async (data: any) => {
  try {
    const response = await privateApi.post("/meals", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMealPlan = async (mealPlanId: string, data: any) => {
  try {
    const response = await privateApi.put(`/meals/${mealPlanId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMealPlan = async (mealPlanId: string) => {
  try {
    const response = await privateApi.delete(`/meals/${mealPlanId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMealPlanById = async (mealPlanId: string) => {
  try {
    const response = await privateApi.get(`/meals/${mealPlanId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMealPlans = async (
  page?: number,
  limit?: number,
  type?: string,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `meals?page=${page ?? ""}&limit=${limit ?? ""}&type=${
        type ?? ""
      }&sort_by=${sort_by ?? ""}&order_by=${order_by ?? ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMealByDate = async (date: string) => {
  try {
    const response = await privateApi.get(`/meals/users?date=${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cloneMealPlan = async (mealPlanIds: string[]) => {
  try {
    const response = await privateApi.post(`/meals/clone`, {
      meal_ids: mealPlanIds,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
