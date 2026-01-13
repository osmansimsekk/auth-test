import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import AppSidebarProvider from "@/providers/AppSidebarProvider";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UserRole } from "@/src/generated/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Project | Profil",
  description:
    "Next.js 16 ile Better Auth öğrenme amacıyla yapılmış bir projedir.",
};

export const ProfileLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session) redirect("/auth/sign-in");

  const fullPostAccess = await auth.api.userHasPermission({
    headers: headersList,
    body: { permissions: { posts: ["update", "delete"] } },
  });

  return (
    <AppSidebarProvider>
      {/* AppSidebarProvider  manages the state of the sidebar form type */}
      <SidebarProvider>
        <AppSidebar
          session={{
            user: {
              name: session.user.name,
              lastName: session.user.lastName,
              isVerified: session.user.emailVerified as boolean,
              image: session.user.image as string,
              role: session.user.role as UserRole,
            },
          }}
          fullPostAccess={fullPostAccess}
        />
        <SidebarTrigger className="mt-3 pr-2" />
        <div className="min-h-screen w-screen mx-auto">{children}</div>
      </SidebarProvider>
    </AppSidebarProvider>
  );
};

export default ProfileLayout;
