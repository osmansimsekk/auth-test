"use client";

import { JSX, useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

type Props = {
  type: "Sign In" | "Sign Up";
  provider: "google" | "github";
  icon: JSX.Element;
};

const SignOAuthButtons = ({ type, provider, icon }: Props) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        // onSuccess: () => {
        //   toast.success("Başarıyla giriş yaptınız!");
        // },
      },
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {type} with {provider[0].toUpperCase() + provider.slice(1)}
      {icon}
    </Button>
  );
};

export default SignOAuthButtons;
