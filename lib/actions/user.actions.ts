"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";

export const deleteUserAction = async ({ userId }: { userId: string }) => {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session) throw new Error("Bu işlem için yetkiniz yok!");
  if (session.user.role !== "ADMIN")
    throw new Error("Bu işlemi sadece Admin gerçekleştirebilir!");

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: "USER",
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({
        headers: headersList,
      });
    }
    revalidatePath("/admin/dashboard");
    return { error: null };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof Error) return { error: err.message };
  }
  return { error: "Bilinmeyen bir hata oluştu." };
};
