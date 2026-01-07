import z from "zod";

type SignInInput = z.infer<typeof signInFormSchema>;
type SignUpInput = z.infer<typeof signUpFormSchema>;

type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
