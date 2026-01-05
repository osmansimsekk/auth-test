import z from "zod";

type SignUpInput = z.infer<typeof signUpFormSchema>;
type SignInInput = z.infer<typeof signInFormSchema>;

type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
