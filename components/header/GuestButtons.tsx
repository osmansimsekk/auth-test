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
        <Button variant="outline" className="gap-2">
          <Link href="/auth/sign-in">Giriş Yap</Link>
          <User className="h-4 w-4" />
        </Button>

        <Button className="gap-2">
          <Link href="/auth/sign-up">Üye Ol</Link>
          <UserPlus className="h-4 w-4" />
        </Button>
      </>
    );
  }

  // mobile
  return (
    <>
      <Button variant="outline" className="w-full h-11 gap-2">
        <Link href="/auth/sign-in" onClick={onClick}>
          Giriş Yap
        </Link>
        <User className="h-4 w-4" />
      </Button>

      <Button className="w-full h-11 gap-2">
        <Link href="/auth/sign-up" onClick={onClick}>
          Üye Ol
        </Link>
        <UserPlus className="h-4 w-4" />
      </Button>
    </>
  );
};
