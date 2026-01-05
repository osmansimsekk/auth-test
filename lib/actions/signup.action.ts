"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signUpFormSchema } from "../form-schemas";
import { SignUpInput } from "@/types";

export async function signUpWithProfile(input: SignUpInput) {
  const data = signUpFormSchema.parse(input);
  const result = await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  if (!result?.user?.id) {
    throw new Error("Signup failed");
  }

  await prisma.user.update({
    where: {
      id: result.user.id,
    },
    data: {
      name: data.name,
      lastName: data.lastName,
      gender: data.gender,
      country: data.country,
    },
  });

  return { ok: true };
}
