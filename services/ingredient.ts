import { privateApi } from "./auth";

export const addIngredient = async (data: any) => {
  try {
    const response = await privateApi.post("/ingredients", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIngredient = async (ingredientId: string, data: any) => {
  try {
    const response = await privateApi.patch(
      `/ingredients/${ingredientId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIngredient = async (ingredientId: string) => {
  try {
    const response = await privateApi.delete(`/ingredients/${ingredientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIngredientById = async (ingredientId: string) => {
  try {
    const response = await privateApi.get(`/ingredients/${ingredientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchIngredient = async (
  search?: string,
  page?: number,
  limit?: number,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/ingredients?${search ? `search=${search}` : ""}${
        page ? `&page=${page}` : ""
      }${limit ? `&limit=${limit}` : ""}${
        sort_by ? `&sort_by=${sort_by}` : ""
      }${order_by ? `&order_by=${order_by}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFruitByName = async (name: string) => {};
