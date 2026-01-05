"use server";

import { auth, ErrorCode } from "@/lib/auth";

import { signInFormSchema, signUpFormSchema } from "../formSchemas";
import { SignInInput, SignUpInput } from "@/types";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { getAuthErrorMessage } from "../utils";

export async function signUpEmailAction(input: SignUpInput) {
  const data = signUpFormSchema.parse(input);
  try {
    await auth.api.signUpEmail({
      body: {
        name: data.name,
        lastName: data.lastName,
        gender: data.gender,
        country: data.country,
        email: data.email,
        role: "USER",
        password: data.password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      const error = getAuthErrorMessage(errCode, err);
      return error;
    }

    return { error: "Bir şeyler ters gitti!" };
  }
}

export async function signInEmailAction(input: SignInInput) {
  const data = signInFormSchema.parse(input);

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      const error = getAuthErrorMessage(errCode, err);
      return error;
    }

    return { error: "Bir şeyler ters gitti!" };
  }
}

export async function signOutAction() {
  try {
    const header = await headers();
    await auth.api.signOut({ headers: header });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      const error = getAuthErrorMessage(errCode, err);
      return error;
    }
  }
  return { error: "Bir şeyler ters gitti!" };
}
