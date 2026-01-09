"use client";

import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserFormInput } from "@/types";
import { updateUserFormSchema as formSchema } from "@/lib/form-schemas";
import { Form } from "../ui/form";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { updateUserAction } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

const UpdateUserForm = ({
  session,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) => {
  const router = useRouter();

  const form = useForm<UpdateUserFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      image: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: session?.user?.name,
      lastName: session?.user?.lastName,
      image: session?.user?.image,
    });
  }, [session?.user, form]);

  const onSubmit = async (values: UpdateUserFormInput) => {
    const { error } = await updateUserAction({
      name: values.name || null,
      lastName: values.lastName || null,
      image: values.image || null,
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success("Kullanıcı bilgileri başarıyla güncellendi.");
      form.reset({
        name: values.name,
        lastName: values.lastName,
        image: values.image,
      });
      router.refresh();
    }
  };

  return (
    <Suspense fallback={<SkeletonUpdateUserForm />}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <p className="text-md border-b-2 py-1 inline-block w-fit">
            Kullanıcı bilgilerinizi güncelleyin.
          </p>

          <InputField
            control={form.control}
            name="name"
            placeholder={session?.user?.name}
            label="Ad"
            error={form.formState.errors.name?.message}
          />

          <InputField
            control={form.control}
            name="lastName"
            placeholder={session?.user?.lastName}
            label="Soyad"
            error={form.formState.errors.lastName?.message}
          />
          <InputField
            control={form.control}
            name="image"
            placeholder="Profil resminizin URL'sini giriniz."
            label="Profil Resmi"
            error={form.formState.errors.image?.message}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Güncelleniyor..." : "Kaydet"}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};

export default UpdateUserForm;

const SkeletonUpdateUserForm = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Skeleton className="h-7 w-48 mb-2" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
};
