import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { UserRole } from "@/src/generated/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Profile = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/sign-in");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headersList,

    body: {
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-x-hidde gap-5 pt-10">
      {session.user.role === UserRole.ADMIN && (
        <Button asChild>
          <Link href="/admin/dashboard">Admin Dashboard</Link>
        </Button>
      )}
      <div className="flex gap-4">
        <Button disabled={!FULL_POST_ACCESS.success}>Manage All Posts</Button>
        <Button>Manage Own Posts</Button>
      </div>

      <pre className="px-10">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Profile;
