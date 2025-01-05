import { create } from "zustand";

const useMealFormStore = create((set) => ({
  planData: {
    workout_plan: {
      name: "",
      description: "",
      number_of_set: 0,
      estimated_calories_burned: null,
      type: "Beginner",
      start_date: "",
      end_date: "",
      estimate_date: 0,
    },
    details: [],
  },
  updateSection: (section: any, data: any) =>
    set((state: any) => ({
      planData: {
        ...state.planData,
        [section]: Array.isArray(data)
          ? [...data]
          : {
              ...state.planData[section],
              ...data,
            },
      },
    })),

  resetForm: () =>
    set({
      planData: {
        workout_plan: {
          name: "",
          description: "",
          number_of_set: 0,
          estimated_calories_burned: null,
          type: "Beginner",
          start_date: "",
          end_date: "",
          estimate_date: 0,
        },
        details: [],
      },
    }),
}));

export default useMealFormStore;
