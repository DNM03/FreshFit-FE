import { create } from "zustand";

const useMealFormStore = create((set) => ({
  mealData: {
    plan: {
      name: "",
      type: "",
      level: "",
      length: "",
      onProgress: false,
    },
    recommends: [
      {
        name: "",
        type: "",
        level: "",
        length: "",
        onProgress: false,
      },
    ],
  },
  updateSection: (section: any, data: any) =>
    set((state: any) => ({
      meal: {
        ...state.mealData,
        [section]: {
          ...state.mealData[section],
          ...data,
        },
      },
    })),

  resetForm: () =>
    set({
      meal: {
        plan: {
          name: "",
          type: "",
          level: "",
          length: "",
          onProgress: false,
        },
        recommends: [
          {
            name: "",
            type: "",
            level: "",
            length: "",
            onProgress: false,
          },
        ],
      },
    }),
}));

export default useMealFormStore;
