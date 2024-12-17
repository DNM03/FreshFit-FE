import { privateApi } from "./auth";

export const updateSetExcercise = async (
  setId: string,
  id: string,
  data: any
) => {
  try {
    const response = await privateApi.patch(
      `/sets-exercise/${setId}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSetExercise = async (setId: string, data: any) => {
  try {
    const response = await privateApi.post(`/sets-exercise/${setId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSetExercise = async (setId: string, id: string) => {
  try {
    const response = await privateApi.delete(`/sets-exercise/${setId}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSetExerciseById = async (setId: string, id: string) => {
  try {
    const response = await privateApi.get(`/sets-exercise/${setId}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
