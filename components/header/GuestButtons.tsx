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
          <User />
        </Button>

        <Button className="gap-2">
          <Link href="/auth/sign-up">Üye Ol</Link>
          <UserPlus />
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Button variant="outline" asChild>
        <Link href="/auth/sign-in" onClick={onClick}>
          <User />
          Giriş Yap
        </Link>
      </Button>

      <Button asChild>
        <Link href="/auth/sign-up" onClick={onClick}>
          <UserPlus />
          Üye Ol
        </Link>
      </Button>
    </div>
  );
};
