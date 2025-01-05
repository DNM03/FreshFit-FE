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
  meal_type?: string,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/meals?page=1&limit=100&type=System&meal_type=All&sort_by=calories&order_by=ASC`
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

export const cloneMealPlan = async (mealPlanIds: string[], date: string) => {
  try {
    const response = await privateApi.post(`/meals/clone`, {
      meal_ids: mealPlanIds,
      date,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
