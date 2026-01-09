"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ResendEmailVerificationInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendEmailVerificationFromSchema as formSchema } from "@/lib/form-schemas";
import { requestPasswordReset, sendVerificationEmail } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const SendEmailVerification = ({
  buttonText,
  variant,
}: {
  buttonText: string;
  variant: "password-reset" | "verification-email";
}) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<ResendEmailVerificationInput>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ResendEmailVerificationInput) => {
    if (variant === "verification-email")
      await sendVerificationEmail({
        email: values.email,
        callbackURL: "/auth/verify",
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
          onSuccess: () => {
            toast.success("Yeni link emailinize gönderildi.");
            router.push("/auth/sign-in");
          },
        },
      });
    else if (variant === "password-reset") {
      await requestPasswordReset({
        email: values.email,
        redirectTo: "/auth/reset-password",

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
          onSuccess: () => {
            toast.success("Sıfırlama linki emailinize gönderildi.");
            router.push("/auth/sign-in");
          },
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-5">
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="test@gmail.com"
            error={form.formState.errors.email?.message}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                <p>Gönderiliyor</p>
              </>
            ) : (
              <p>{buttonText}</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendEmailVerification;
