import { privateApi } from "./auth";

export const addNewChallenge = async (data: any) => {
  try {
    const response = await privateApi.post("/challenges", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateChallenge = async (challengeId: string, data: any) => {
  try {
    const response = await privateApi.patch(`/challenges/${challengeId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMeal = async (challengeId: string, data: any) => {
  try {
    const response = await privateApi.put(
      `/challenges/${challengeId}/meal`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkout = async (challengeId: string, data: any) => {
  try {
    const response = await privateApi.put(
      `/challenges/${challengeId}/workout`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChallege = async (challengeId: string) => {
  try {
    const response = await privateApi.delete(`/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinChallenge = async (challengeId: string) => {
  try {
    const response = await privateApi.post(`/challenges/join/${challengeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChallengeById = async (challengeId: string) => {
  try {
    const response = await privateApi.get(`/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchChallenges = async (
  search: string,
  page?: number,
  limit?: number,
  type?: string,
  sort_by?: string,
  order_by?: string
) => {
  try {
    const response = await privateApi.get(
      `/challenges?search=${search}${page ? `&page=${page}` : ""}${
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

export const activeChallenges = async (challengeId: string) => {
  try {
    const response = await privateApi.get(
      `/challenges/${challengeId}/activate`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deactivateChallenges = async (challengeId: string) => {
  try {
    const response = await privateApi.get(
      `/challenges/${challengeId}/deactivate`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
