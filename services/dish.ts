import { privateApi } from "./auth";

export const addDish = async (data: any) => {
  try {
    const response = await privateApi.post("/dishes", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDish = async (dishId: string, data: any) => {
  try {
    const response = await privateApi.patch(`/dishes/${dishId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDishIngredients = async (
  dishId: string,
  ingredientId: string,
  data: any
) => {
  try {
    const response = await privateApi.patch(
      `/dishes/${dishId}/ingredients/${ingredientId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDishIngredientDetail = async (
  dishId: string,
  ingredientId: string
) => {
  try {
    const response = await privateApi.get(
      `/dishes/${dishId}/ingredients/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDishIngredient = async (
  dishId: string,
  ingredientId: string
) => {
  try {
    const response = await privateApi.delete(
      `/dishes/${dishId}/ingredients/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addDishIngredient = async (dishId: string, data: any) => {
  try {
    const response = await privateApi.post(
      `/dishes/${dishId}/ingredients`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDishDetail = async (dishId: string) => {
  try {
    const response = await privateApi.get(`/dishes/${dishId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ratingDish = async (dishId: string, data: any) => {
  try {
    const response = await privateApi.post(`/dishes/${dishId}/rating`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchDish = async (
  search: string,
  page?: number,
  limit?: number,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/dishes?search=${search}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${sort_by ? `&sort_by=${sort_by}` : ""}${
        order_by ? `&order_by=${order_by}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedDishes = async (data: any) => {
  try {
    const response = await privateApi.post(
      "/recommends/dishes?season=athumn&meal_type=dinner&quick_recipe=true",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
