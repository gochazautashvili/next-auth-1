"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas/schemas";
import { z } from "zod";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedValues = ResetSchema.safeParse(data);

  if (!validatedValues.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
