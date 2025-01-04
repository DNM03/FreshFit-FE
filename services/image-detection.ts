import axios from "axios";
import FormData from "form-data";

const imageApi = axios.create({
  baseURL: process.env.IMAGE_DETECTION_URL,
});

export const getDetection = async (imageUri: string) => {
  try {
    const form = new FormData();
    form.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    const response = await imageApi.post("/predict", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
