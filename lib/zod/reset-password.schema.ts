import { z } from "zod";

export const resetPasswordSchema = () =>
  z
    .object({
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
export const resetPasswordDefaultValues = {
  password: "",
  confirm_password: "",
};

export type ResetPasswordValues = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
