import z from "zod";
import { resetPasswordFormSchema } from "./lib/formSchemas";

type SignInInput = z.infer<typeof signInFormSchema>;
type SignUpInput = z.infer<typeof signUpFormSchema>;
type ResendEmailVerificationInput = z.infer<
  typeof resendEmailVerificationFromSchema
>;

type ResetPasswordInput = z.infer<typeof resetPasswordFormSchema>;

type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
