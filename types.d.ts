import z from "zod";
import { resetPasswordFormSchema } from "./lib/form-schemas";

type SignInInput = z.infer<typeof signInFormSchema>;
type SignUpInput = z.infer<typeof signUpFormSchema>;
type ResendEmailVerificationInput = z.infer<
  typeof resendEmailVerificationFromSchema
>;
type ResetPasswordInput = z.infer<typeof resetPasswordFormSchema>;
type UpdatePasswordInput = z.infer<typeof updatePasswordFormSchema>;
type UpdateUserFormInput = z.infer<typeof updateUserFormSchema>;

type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
