"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  userName: string;
  onSignOut: () => void;
  isLoggingOut?: boolean;
  variant?: "desktop" | "mobile";
  onCloseMenu?: () => void;
};

export const UserMenuButtons = ({
  userName,
  onSignOut,
  isLoggingOut,
  variant = "desktop",
  onCloseMenu,
}: Props) => {
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        <Button asChild variant="outline">
          <Link href="/profile" onClick={onCloseMenu}>
            <User />
            {userName}
          </Link>
        </Button>

        <Button
          disabled={isLoggingOut}
          variant="destructive"
          onClick={onSignOut}
        >
          <LogOut />
          Çıkış Yap
        </Button>
      </div>
    );
  }
  return (
    <div className="flex gap-4 items-center">
      <Button asChild variant="outline">
        <Link href="/profile">
          <User />
          {userName}
        </Link>
      </Button>

      <Button disabled={isLoggingOut} variant="default" onClick={onSignOut}>
        <LogOut />
        Çıkış Yap
      </Button>
    </div>
  );
};
