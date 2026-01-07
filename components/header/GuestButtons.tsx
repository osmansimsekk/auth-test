"use client";

import Link from "next/link";
import { User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type GuestButtonsProps = {
  variant: "desktop" | "mobile";
  onClick?: () => void;
};

export const GuestButtons = ({ variant, onClick }: GuestButtonsProps) => {
  if (variant === "desktop") {
    return (
      <>
        <Link href="/auth/sign-in">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Giriş Yap
          </Button>
        </Link>

        <Link href="/auth/sign-up">
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Üye Ol
          </Button>
        </Link>
      </>
    );
  }

  // mobile
  return (
    <>
      <Link href="/auth/sign-in" onClick={onClick}>
        <Button variant="outline" className="w-full h-11 gap-2">
          <User className="h-4 w-4" />
          Giriş Yap
        </Button>
      </Link>

      <Link href="/auth/sign-up" onClick={onClick}>
        <Button className="w-full h-11 gap-2">
          <UserPlus className="h-4 w-4" />
          Üye Ol
        </Button>
      </Link>
    </>
  );
};
