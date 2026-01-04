"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FormFooter = () => {
  const pathName = usePathname();

  return (
    <div className="text-sm text-gray-500">
      {pathName === "/sign-in" ? (
        <>
          <span>Hesabınız yok mu? </span>
          <Link
            href="/sign-up"
            className="text-gray-300 border-b border-transparent hover:border-b-white cursor-pointer"
          >
            Kayıt olun.
          </Link>
        </>
      ) : (
        <>
          <span>Zaten bir hesabınız var mı? </span>
          <Link
            className="text-gray-300 border-b border-transparent hover:border-b-white cursor-pointer"
            href="/sign-in"
          >
            Giriş yapın.
          </Link>
        </>
      )}
    </div>
  );
};

export default FormFooter;
