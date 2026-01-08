import SendEmailVerification from "@/components/form/SendEmailVerification";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ error: string }>;
};

const ErrorPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col gap-10">
      <div className="text-2xl">
        <div className="flex flex-col gap-10">
          <p className=" border-b-3 py-1">
            {params.error === "email_not_verified" ? (
              <>
                Email adresiniz doğrulanmamış.
                <br />
                Lütfen email adresinizi doğrulayın.
              </>
            ) : params.error === "invalid_token" || "token_expired" ? (
              "Giriş linkiniz geçersiz ya da süresi dolmuş. Yeniden deneyin."
            ) : (
              "Upsss! Giriş yapılırken bir hata oluştu!"
            )}
          </p>

          <div className="w-full flex justify-center">
            <div className="max-w-lg w-full">
              <SendEmailVerification />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Button>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
