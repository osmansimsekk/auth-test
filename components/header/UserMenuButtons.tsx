"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type Props = {
  userName: string;
  onSignOut: () => void;
  isLoggingOut?: boolean;
  variant?: "desktop" | "mobile";
  onCloseMenu?: () => void;
  userImage?: string;
};

export const UserMenuButtons = ({
  userName,
  onSignOut,
  isLoggingOut,
  variant = "desktop",
  onCloseMenu,
  userImage,
}: Props) => {
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        <Button asChild variant="outline">
          <Link href="/profile" onClick={onCloseMenu}>
            <Avatar className="size-6">
              <AvatarImage
                src={userImage}
                alt="@shadcn"
                sizes="(max-width: 768px) 32px, 40px"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
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
          <Avatar className="size-6">
            <AvatarImage src={userImage} alt="@shadcn" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
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
