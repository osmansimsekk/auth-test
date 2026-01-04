"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/form/InputField";
import FormFooter from "@/components/form/FormFooter";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn.email(
        {
          ...values,
        },

        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Başarıyla Giriş Yaptınız.");
            router.replace("/");
          },
        }
      );
    } catch (e) {
      console.error(e);
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
            placeholder="nike@tr.com"
            label="Email"
            error={form.formState.errors.email?.message}
          />

          <InputField
            control={form.control}
            name="password"
            type="password"
            label="Şifre"
            placeholder="Şifrenizi girin"
            error={form.formState.errors.password?.message}
          />

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
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
