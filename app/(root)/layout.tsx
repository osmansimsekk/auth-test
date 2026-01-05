import Header from "@/components/header/Header";

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 overflow-visible">{children}</main>
    </>
  );
}
