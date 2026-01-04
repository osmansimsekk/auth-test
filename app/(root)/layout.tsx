import Header from "@/components/Header";

export default function RootGroupLayout({
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
