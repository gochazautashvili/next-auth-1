import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  name: z.string().min(1, { message: "name must be lass then 1 character" }),
  password: z
    .string()
    .min(5, { message: "password must be lass then 5 character" }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(5, { message: "password must be lass then 5 character" }),
});
