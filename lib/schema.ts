import { z } from "zod";
// UTILS
import { checkIfValidPhoneNumber } from "./utils";

// AUTH
export const loginSchema = z.object({
  email: z.string().email("Please enter valid email adderess").toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter [A-Z]")
    .regex(/\d/, "Password must contain at least one numeric character [0-9]")
    .regex(
      /[~!@#$%]/,
      "Password must contain at least one special character: ~!@#$%"
    ),
});

export const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Please provide your full Name",
        invalid_type_error: "Please provide valid name",
      })
      .min(1, {
        message: "Please provide your full name",
      }),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter [A-Z]"
      )
      .regex(/\d/, "Password must contain at least one numeric character [0-9]")
      .regex(
        /[~!@#$%]/,
        "Password must contain at least one special character: ~!@#$%"
      ),
    organizationName: z
      .string({
        required_error: "Please provide your company name",
        invalid_type_error: "Please provide a valid name",
      })
      .min(1, {
        message: "Please provide company name",
      }),
    phoneNumber: z
      .string()
      .optional()
      .refine((value) => checkIfValidPhoneNumber(value), {
        message: "Please enter valid phone number format",
      }),
  })
  .transform((data) => {
    const { phoneNumber = "", ...rest } = data ?? {};
    if (phoneNumber === "") return rest;
    else return data;
  });

export const accountVerificationSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 characters",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter [A-Z]"
      )
      .regex(/\d/, "Password must contain at least one numeric character [0-9]")
      .regex(
        /[~!@#$%]/,
        "Password must contain at least one special character: ~!@#$%"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter [A-Z]"
      )
      .regex(/\d/, "Password must contain at least one numeric character [0-9]")
      .regex(
        /[~!@#$%]/,
        "Password must contain at least one special character: ~!@#$%"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Both Passwords must match",
    path: ["confirmPassword"],
  });

// EXPORT TYPES
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type AccountVerificationSchemaType = z.infer<
  typeof accountVerificationSchema
>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
