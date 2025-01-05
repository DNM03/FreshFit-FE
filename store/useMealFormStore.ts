import { create } from "zustand";

const useMealFormStore = create((set) => ({
  mealData: {
    plan: {
      name: "",
      date: "",
      description: "",
      calories: 0,
      pre_time: 0,
      meal_type: "Breakfast",
    },
    dishes: [],
    ingredients: [
      {
        ingredientId: "",
        quantity: 0,
        unit: "kg",
      },
    ],
  },
  updateSection: (section: any, data: any) =>
    set((state: any) => ({
      mealData: {
        ...state.mealData,
        [section]: Array.isArray(data)
          ? [...data]
          : {
              ...state.mealData[section],
              ...data,
            },
      },
    })),

  resetForm: () =>
    set({
      mealData: {
        plan: {
          name: "",
          date: "",
          description: "",
          calories: 0,
          pre_time: 0,
          meal_type: "Breakfast",
        },
        dishes: [],
        ingredients: [
          {
            ingredientId: "",
            quantity: 0,
            unit: "kg",
          },
        ],
      },
    }),
}));

export default useMealFormStore;
