import { privateApi } from "./auth";

export const addNewSet = async (data: any) => {
  try {
    const response = await privateApi.post("/sets", data);
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

export const deleteSet = async (setId: string) => {
  try {
    const response = await privateApi.delete(`/sets/${setId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSetById = async (setId: string) => {
  try {
    const response = await privateApi.get(`/sets/${setId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchSet = async (
  search: string,
  page?: number,
  limit?: number,
  sort_by?: string,
  order_by?: string,
  type?: string
) => {
  try {
    const response = await privateApi.get(
      `/sets?search=${search}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${sort_by ? `&sort_by=${sort_by}` : ""}${
        order_by ? `&order_by=${order_by}` : ""
      }${type ? `&type=${type}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cloneSet = async (setIds: string[]) => {
  try {
    const response = await privateApi.post("/sets/clone", {
      set_ids: setIds,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ratingSet = async (setId: string, value: number) => {
  try {
    const response = await privateApi.post(`/sets/${setId}/rating`, {
      value,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
