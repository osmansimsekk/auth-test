"use client";
import { UpdatePasswordInput } from "@/types";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordFormSchema as formSchema } from "@/lib/form-schemas";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { updatePasswordAction } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdatePasswordForm = () => {
  const router = useRouter();
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldpassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordInput) => {
    const { error } = await updatePasswordAction({
      newPassword: values.password,
      currentPassword: values.oldpassword,
    });

    if (error) {
      toast.error(error);
    }
    if (!error) {
      toast.success("Şifreniz başarıyla güncellendi.");
      form.reset();
      router.refresh();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-md border-b-2 py-1 inline-block w-fit">
              Şifrenizi güncelleyin.
            </p>
            <div className="flex flex-col gap-1">
              <InputField
                control={form.control}
                name="oldpassword"
                type="password"
                placeholder="Eski şifrenizi giriniz"
                label="Eski Şifre"
                error={form.formState.errors.oldpassword?.message}
              />

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

              <div className="flex justify-center mt-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <div className="flex gap-1 items-center">
                      <Spinner />
                      <p>Şifreniz güncelleniyor..</p>
                    </div>
                  ) : (
                    "Şifreyi Güncelle"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
