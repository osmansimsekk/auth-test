"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  gender: z.enum(["MALE", "FEMALE"]),
  country: z.enum(["TR", "US", "DE", "FR", "GB"]),
});

type SignUpInput = z.infer<typeof SignUpSchema>;

export async function signUpWithProfile(input: SignUpInput) {
  const data = SignUpSchema.parse(input);
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
