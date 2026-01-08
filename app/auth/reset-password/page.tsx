import ResetPasswordForm from "@/components/page/ResetPassword";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;

  if (!token) redirect("/auth/sign-in");

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
