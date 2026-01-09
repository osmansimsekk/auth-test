"use client";

import { resetPasswordFormSchema as formSchema } from "@/lib/form-schemas";
import { ResetPasswordInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import InputField from "../form/InputField";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { resetPassword } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ResetPasswordInput) {
    await resetPassword({
      newPassword: values.password,
      token,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Şifreniz başarıyla sıfırlandı!");
          router.push("/auth/sign-in");
        },
      },
    });
  }

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div>
            <p className="text-2xl border-b-2 py-1 inline-block">
              Şifrenizi sıfırlayın.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <InputField
              control={form.control}
              name="password"
              type="password"
              placeholder="Yeni şifrenizi giriniz"
              label="Şifre"
              error={form.formState.errors.password?.message}
            />

            <InputField
              control={form.control}
              name="passwordConfirm"
              type="password"
              label="Şifreyi Onayla"
              placeholder="Yeni şifrenizi tekrardan giriniz"
              error={form.formState.errors.passwordConfirm?.message}
            />

            {/* Button wrapper */}
            <div className="flex justify-center mt-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="flex gap-1 items-center">
                    <Spinner />
                    <p>Şifreniz sıfırlanıyor..</p>
                  </div>
                ) : (
                  "Şifreyi Sıfırla"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
