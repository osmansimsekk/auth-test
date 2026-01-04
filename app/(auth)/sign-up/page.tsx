"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/form/InputField";
import FormFooter from "@/components/form/FormFooter";
import SelectField from "@/components/form/SelectField";
import { signUp } from "@/lib/actions/auth.actions";
import CountrySelectField from "@/components/form/CountrySelectField";
import { countries } from "@/public/data/contants";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  surname: z.string().min(2, { message: "Surname is required." }),
  gender: z.enum(["Erkek", "Kadın", ""]),
  email: z
    .string()
    .min(1, { message: "Email zorunludur." })
    .email({ message: "Invalid email address." }),
  country: z.string().min(1, "Country is required"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      gender: "",
      country: "TR",
    },
    mode: "onBlur",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUp(values);
  }

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField
              control={form.control}
              name="name"
              placeholder="Adınızı yazın"
              label="Ad"
              error={form.formState.errors.name?.message}
            />

            <InputField
              control={form.control}
              name="surname"
              label="Soyad"
              placeholder="Soyadınızı girin"
              error={form.formState.errors.surname?.message}
            />

            <div className="md:col-span-2">
              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="nike@tr.com"
                error={form.formState.errors.email?.message}
              />
            </div>

            <div className="md:col-span-2">
              <InputField
                control={form.control}
                name="password"
                type="password"
                placeholder="Şifrenizi giriniz."
                label="Şifre"
                error={form.formState.errors.password?.message}
              />

              <div className="lg:grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:mt-4">
                <CountrySelectField
                  name="country"
                  label="Ülke"
                  control={form.control}
                  error={form.formState.errors.country?.message}
                  options={countries}
                />

                <SelectField
                  name="gender"
                  label="Cinsiyet"
                  control={form.control}
                  options={[
                    { label: "Erkek", value: "Erkek" },
                    { label: "Kadın", value: "Kadın" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <Button type="submit">Kayıt Ol</Button>
            <FormFooter />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
