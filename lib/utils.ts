import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const isEmailValid = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const calculateBMI = (weight: number, height: number): boolean => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive values.");
  }

  const bmi = parseFloat((weight / (height * height)).toFixed(2));

  let category = "";
  let isNormal = false;

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    isNormal = true;
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return isNormal;
};
