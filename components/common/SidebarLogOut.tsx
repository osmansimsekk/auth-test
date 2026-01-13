"use client";

import { LogOut, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SidebarLogOut = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: () => {
          setIsPending(false);
          toast.error("Çıkış yapılamadı.");
        },
        onSuccess: () => {
          toast.success("Çıkış başarılı.");
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleSignOut}
      variant="ghost"
      className="ml-auto flex h-7 w-7 items-center justify-center rounded-md hover:bg-destructive/20 transition-colors group-data-[state=collapsed]:hidden disabled:opacity-50"
      title="Çıkış Yap"
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-muted-foreground" />
      ) : (
        <LogOut
          size={16}
          className="text-destructive opacity-70 hover:opacity-100"
        />
      )}
    </Button>
  );
};

export default SidebarLogOut;
