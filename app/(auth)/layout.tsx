import AuthPage from "@/components/page/AuthPage";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen overflow-visible flex">
      {children}
      <AuthPage />
    </main>
  );
};

export default Layout;
