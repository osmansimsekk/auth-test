import { UserTable } from "@/components/admin/UserTable";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/sign-in");
  if (session.user.role !== "ADMIN") redirect("/");

  // From NEON Database

  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // });

  // From Better Auth
  const usersResult = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: "name",
    },
  });

  return (
    <div className="py-10 px-10 min-h-screen w-screen">
      <Button asChild>
        <Link href="/">Ana Sayfa</Link>
      </Button>
      <h1 className="text-4xl text-center mb-10">ADMIN DASHBOARD</h1>
      <UserTable users={usersResult} />
    </div>
  );
};

export default Page;
