import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ErrorCode } from "./auth";
import { APIError } from "better-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthErrorMessage(
  code: ErrorCode,
  error: APIError
): { error: string } {
  switch (code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return { error: "E-posta veya şifre hatalı." };

    case "INVALID_EMAIL":
      return { error: "Geçersiz e-posta adresi." };

    case "INVALID_PASSWORD":
      return { error: "Geçersiz şifre." };

    case "PASSWORD_TOO_SHORT":
      return { error: "Şifre çok kısa." };

    case "PASSWORD_TOO_LONG":
      return { error: "Şifre çok uzun." };

    case "EMAIL_NOT_VERIFIED":
      return { error: "E-posta adresiniz doğrulanmamış." };

    case "USER_NOT_FOUND":
      return { error: "Kullanıcı bulunamadı." };

    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return { error: "Bu e-posta adresi zaten kullanımda." };

    case "SOCIAL_ACCOUNT_ALREADY_LINKED":
      return {
        error: "Bu sosyal hesap zaten başka bir kullanıcıya bağlı.",
      };

    case "PROVIDER_NOT_FOUND":
      return { error: "Kimlik sağlayıcısı bulunamadı." };

    case "INVALID_TOKEN":
    case "ID_TOKEN_NOT_SUPPORTED":
      return { error: "Geçersiz veya desteklenmeyen token." };

    case "FAILED_TO_CREATE_USER":
    case "FAILED_TO_CREATE_SESSION":
    case "FAILED_TO_UPDATE_USER":
    case "FAILED_TO_GET_SESSION":
    case "FAILED_TO_GET_USER_INFO":
      return {
        error: "Bir sunucu hatası oluştu. Lütfen tekrar deneyin.",
      };

    case "EMAIL_CAN_NOT_BE_UPDATED":
      return { error: "E-posta adresi güncellenemiyor." };

    case "CREDENTIAL_ACCOUNT_NOT_FOUND":
      return { error: "Giriş bilgileri bulunamadı." };

    case "USER_EMAIL_NOT_FOUND":
      return {
        error: "Kullanıcının e-posta adresi bulunamadı.",
      };

    case "UNKNOWN":
    default:
      return {
        error: error.message,
      };
  }
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const VALID_DOMAINS = () => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
};
