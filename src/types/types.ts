import { LoginSchema, NewPasswordSchema, ResetSchema } from "@/schemas/schemas";
import { z } from "zod";

export type LoginZodFormType = z.infer<typeof LoginSchema>;
export type ResetZodFormType = z.infer<typeof ResetSchema>;
export type NewPasswordZodFormType = z.infer<typeof NewPasswordSchema>;
