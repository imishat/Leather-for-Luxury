import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});
const ChangePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "oldPassword is required",
    }),
    newPassword: z.string({
      required_error: "NewPassword is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,

  ChangePasswordZodSchema,
};
