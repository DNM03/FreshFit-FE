import { privateApi } from "./auth";

export const getAllExercises = async () => {
  try {
    const response = await privateApi.get("/exercises/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addExercise = async (data: any) => {
  try {
    const response = await privateApi.post("/exercises", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExercise = async (exerciseId: string, data: any) => {
  try {
    const response = await privateApi.patch(`/exercises/${exerciseId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseById = async (exerciseId: string) => {
  try {
    const response = await privateApi.get(`/exercises/${exerciseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchExercises = async (
  search: string,
  page?: number,
  limit?: number,
  type?: string,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/exercises?search=${search}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${type ? `&type=${type}` : ""}${sort_by ? `&sort_by=${sort_by}` : ""}${
        order_by ? `&order_by=${order_by}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExercise = async (exerciseId: string) => {
  try {
    const response = await privateApi.delete(`/exercises/${exerciseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
