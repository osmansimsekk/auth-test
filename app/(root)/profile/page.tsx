import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <p className="text-destructive">unathoriezed</p>;

  return (
    <div className="min-h-screen flex justify-center items-center overflow-x-hidden">
      <pre className="px-10">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Profile;
