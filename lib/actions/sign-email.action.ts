"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signInFormSchema, signUpFormSchema } from "../form-schemas";
import { SignUpInput } from "@/types";
import { headers } from "next/headers";

export async function signUpEmailAction(input: SignUpInput) {
  const data = signUpFormSchema.parse(input);
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    await prisma.user.update({
      where: {
        id: result.user.id,
      },
      data: {
        lastName: data.lastName,
        gender: data.gender,
        country: data.country,
      },
    });

    return { error: null };
  } catch {
    return { error: "Bir şeyler ters gitti." };
  }
}

export async function signInEmailAction(formData: FormData) {
  const data = signInFormSchema.parse(formData);

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return { error: null };
  } catch {
    return { error: "Bir şeyler ters gitti!" };
  }
}

export async function signOutAction() {
  try {
    const header = await headers();
    await auth.api.signOut({ headers: header });
    return { error: null };
  } catch {
    return { error: "Çıkış yapılırken bir hata oldu." };
  }
}
