import z from "zod";
import { COUNTRY_CODES } from "./countries";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ad en az 2 karakter olmalıdır." })
    .regex(/^[A-Za-zÇĞİÖŞÜçğıöşü\s-]+$/, {
      message: "Ad sadece harflerden oluşmalıdır.",
    }),
  lastName: z
    .string()
    .min(2, { message: "Soyad en az 2 karakter olmalıdır." })
    .regex(/^[A-Za-zÇĞİÖŞÜçğıöşü\s-]+$/, {
      message: "Soyad sadece harflerden oluşmalıdır.",
    }),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Cinsiyet seçimi zorunludur.",
  }),
  email: z
    .string()
    .min(1, { message: "E-posta adresi zorunludur." })
    .email({ message: "Geçerli bir e-posta adresi giriniz." }),
  country: z
    .string()
    .min(1, { message: "Ülke seçimi zorunludur." })
    .refine((val) => COUNTRY_CODES.has(val), {
      message: "Geçerli bir ülke seçiniz.",
    }),
  password: z.string().min(8, {
    message: "Şifre en az 8 karakter olmalıdır.",
  }),
});

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta adresi zorunludur." })
    .email({ message: "Geçerli bir e-posta adresi giriniz." }),

  password: z.string().min(8, {
    message: "Şifre en az 8 karakter olmalıdır.",
  }),
});

export const resendEmailVerificationFromSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta adresi zorunludur." })
    .email({ message: "Geçerli bir e-posta adresi giriniz." }),
});

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Şifre en az 8 karakter olmalıdır.",
    }),
    passwordConfirm: z.string().min(8, {
      message: "Şifre en az 8 karakter olmalıdır.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
  });
