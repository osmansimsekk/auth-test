"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/form/InputField";
import FormFooter from "@/components/form/FormFooter";

import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { signInFormSchema as formSchema } from "@/lib/formSchemas";
import { SignInInput } from "@/types";
import { signInEmailAction } from "@/lib/actions/sign-email.action";
import { toast } from "sonner";
import SignOAuthButtons from "@/components/form/SignOAuthButtons";
import { GithubIcon } from "lucide-react";
import GoogleIcon from "@/components/form/GoogleIcon";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";

const SignIn = () => {
  const form = useForm<SignInInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });

  const router = useRouter();
  const { isDark } = useTheme();

  async function onSubmit(values: SignInInput) {
    const { error } = await signInEmailAction(values);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Başarıyla giriş yaptınız!");
      router.replace("/profile");
    }
  }

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputField
            control={form.control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            label="Email"
            error={form.formState.errors.email?.message}
          />

          <div className="flex flex-col gap-1">
            <InputField
              control={form.control}
              name="password"
              type="password"
              label="Şifre"
              placeholder="Şifrenizi girin"
              error={form.formState.errors.password?.message}
            />

            <Link
              href="/auth/forgot-password"
              className="-mt-4 text-sm text-right text-foreground/50 hover:text-foreground hover:underline"
            >
              Şifrenizi mi unuttunuz?
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className="flex gap-1 items-center">
                  <Spinner />
                  <p>Giriş Yapılıyor...</p>
                </div>
              ) : (
                "Giriş Yap"
              )}
            </Button>

            <FormFooter />
            <hr className="w-full mb-5 mt-2" />
            <SignOAuthButtons
              type="Sign Up"
              provider="google"
              icon={<GoogleIcon color={isDark ? "#000" : "#fff"} />}
            />
            <SignOAuthButtons
              type="Sign In"
              provider="github"
              icon={<GithubIcon />}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
