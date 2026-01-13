import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Project | Admin Paneli",
  description:
    "Next.js 16 ile Better Auth öğrenme amacıyla yapılmış bir projedir.",
};

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-background">{children}</main>;
};

export default AdminLayout;
