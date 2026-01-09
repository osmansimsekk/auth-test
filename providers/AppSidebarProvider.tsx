"use client";
import { createContext, useContext, useState } from "react";

interface Props {
  formType: "user" | "password";
  setFormType: (type: Props["formType"]) => void;
}

const SidebarContext = createContext<Props | undefined>(undefined);

const AppSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [formType, setFormType] = useState<Props["formType"]>("user");

  return (
    <SidebarContext.Provider value={{ formType, setFormType }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default AppSidebarProvider;

export const useAppSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useAppSidebar must be used within an AppSidebarProvider");
  }
  return context;
};
