import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <Header session={session} />
      <main className="min-h-screen pt-20 overflow-visible">{children}</main>
    </>
  );
}
