import SendEmailVerification from "@/components/form/SendEmailVerification";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ error: string }>;
};

const VerifyPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col gap-10">
      {/* Ortak max width */}
      <div className="max-w-lg w-full flex flex-col gap-8">
        {/* Geri Dön */}
        <div className="flex justify-start">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeftIcon className="w-4 h-4" />
              Geri Dön
            </Link>
          </Button>
        </div>

        {/* Mesaj */}
        <p className="text-2xl border-b py-2">
          {params.error === "email_not_verified" ? (
            <>
              Email adresiniz doğrulanmamış.
              <br />
              Lütfen email adresinizi doğrulayın.
            </>
          ) : params.error === "invalid_token" ||
            params.error === "token_expired" ? (
            "Giriş linkiniz geçersiz ya da süresi dolmuş. Yeniden deneyin."
          ) : (
            "Upsss! Giriş yapılırken bir hata oluştu!"
          )}
        </p>

        {/* Form */}
        <SendEmailVerification
          buttonText="Yeniden Doğrulama Gönder"
          variant="verification-email"
        />
      </div>
    </div>
  );
};

export default VerifyPage;
