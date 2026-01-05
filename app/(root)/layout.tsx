import Header from "@/components/header/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await headers();
  const session = await auth.api.getSession({
    headers: header,
  });
  return (
    <>
      <Header session={session} />
      <main className="min-h-screen pt-20 overflow-visible">{children}</main>
    </>
  );
}
