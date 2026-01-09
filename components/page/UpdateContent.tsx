"use client";

import { useAppSidebar } from "@/providers/AppSidebarProvider";
import UpdatePassword from "@/components/form/UpdatePasswordForm";
import UpdateUserForm from "../form/UpdateUserForm";
import { auth } from "@/lib/auth";

const UpdateContent = ({
  session,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) => {
  const { formType } = useAppSidebar();

  if (formType === "password") {
    return <UpdatePassword />;
  } else if (formType === "user") {
    return <UpdateUserForm session={session} />;
  }
  return null;
};

export default UpdateContent;
