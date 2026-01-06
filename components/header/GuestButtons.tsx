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
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/sign-in">
            <User className="h-4 w-4" />
            Giriş Yap
          </Link>
        </Button>

        <Button className="gap-2" asChild>
          <Link href="/sign-up">
            <UserPlus className="h-4 w-4" />
            Üye Ol
          </Link>
        </Button>
      </>
    );
  }

  // mobile
  return (
    <>
      <Button variant="outline" className="w-full h-11 gap-2" asChild>
        <Link href="/sign-in" onClick={onClick}>
          <User className="h-4 w-4" />
          Giriş Yap
        </Link>
      </Button>

      <Button className="w-full h-11 gap-2" asChild>
        <Link href="/sign-up" onClick={onClick}>
          <UserPlus className="h-4 w-4" />
          Üye Ol
        </Link>
      </Button>
    </>
  );
};
