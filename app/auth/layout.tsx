import AuthPage from "@/components/page/AuthPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const header = await headers();
  const session = await auth.api.getSession({
    headers: header,
  });

  if (session) redirect("/");

  return (
    <main className="min-h-screen overflow-visible flex relative">
      {children}
      <AuthPage />
    </main>
  );
};

export default Layout;
