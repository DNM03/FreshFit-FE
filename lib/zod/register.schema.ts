import { z } from "zod";

export const registerSchema = () =>
  z
    .object({
      username: z.string().min(1, { message: "Username is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          }
        ),
      confirm_password: z
        .string()
        .min(1, { message: "Confirm password is required" }),
    })
    .refine((data: any) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"], // path of error
    });
export const registerDefaultValues = {
  email_or_username: "",
  password: "",
};

export type RegisterValues = z.infer<ReturnType<typeof registerSchema>>;
