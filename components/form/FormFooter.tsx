"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FormFooter = () => {
  const pathName = usePathname();

  return (
    <div className="text-sm dark:text-gray-500 text-zinc-600">
      {pathName === "/sign-in" ? (
        <>
          <span>Hesabınız yok mu? </span>
          <Link
            href="/sign-up"
            className="dark:text-gray-300 border-b border-transparent dark:hover:border-b-white hover:border-b-zinc-900 cursor-pointer text-zinc-800"
          >
            Kayıt olun.
          </Link>
        </>
      ) : (
        <>
          <span>Zaten bir hesabınız var mı? </span>
          <Link
            href="/sign-in"
            className="dark:text-gray-300 border-b border-transparent dark:hover:border-b-white hover:border-b-zinc-900 cursor-pointer text-zinc-800"
          >
            Giriş yapın.
          </Link>
        </>
      )}
    </div>
  );
};

export default FormFooter;
