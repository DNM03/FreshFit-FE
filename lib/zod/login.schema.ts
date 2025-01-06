import { z } from "zod";

export const loginSchema = () =>
  z.object({
    email_or_username: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

export const loginDefaultValues = {
  email_or_username: "",
  password: "",
};

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;
