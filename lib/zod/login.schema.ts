import { z } from "zod";

export const loginSchema = () =>
  z.object({
    email_or_username: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

export const loginDefaultValues = {
  email_or_username: "",
  password: "",
};

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;
