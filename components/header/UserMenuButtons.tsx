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
            <User className="mr-2 h-4 w-4" />
            {userName}
          </Link>
        </Button>

        <Button
          disabled={isLoggingOut}
          variant="destructive"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    );
  }

  // desktop
  return (
    <div className="flex gap-4 items-center">
      <Button asChild variant="ghost">
        <Link href="/profile">
          <User className="w-4 h-4 mr-2" />
          {userName}
        </Link>
      </Button>

      <Button disabled={isLoggingOut} variant="destructive" onClick={onSignOut}>
        <LogOut className="w-4 h-4 mr-2" />
        Çıkış Yap
      </Button>
    </div>
  );
};
