import SendEmailVerification from "@/components/form/SendEmailVerification";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const ForgotPage = () => {
  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col gap-10">
      <div className="max-w-lg w-full flex flex-col gap-6">
        {/* Geri Dön */}
        <div className="flex justify-start">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/auth/sign-in">
              <ArrowLeftIcon className="w-4 h-4" />
              Geri Dön
            </Link>
          </Button>
        </div>

        {/* Açıklama */}
        <div>
          <p className="inline-block pb-[0.5px] hover:border-foreground border-transparent border-b">
            Şifrenizi sıfırlamak için emailinizi girin.
          </p>
        </div>

        {/* Form */}
        <SendEmailVerification buttonText="Gönder" variant="password-reset" />
      </div>
    </div>
  );
};

export default ForgotPage;
