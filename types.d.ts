import z from "zod";

type SignInInput = z.infer<typeof signInFormSchema>;
type SignUpInput = z.infer<typeof signUpFormSchema>;
type ResendEmailVerification = z.infer<
  typeof resendEmailVerificationFromSchema
>;

type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
