import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ error: string }>;
};

const ErrorPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  console.log(params);

  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col gap-10">
      <p className="text-2xl border-b-3 py-1 ">
        {params.error === "account_not_linked"
          ? "Bu hesap başka bir giriş methoduyla eşleşmiş."
          : "Upsss! Giriş yapılırken bir hata oluştu!"}
      </p>
      <div className="flex gap-5 items-center">
        <Button>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
        <Button>
          <Link href="/auth/sign-in">Tekrar Dene</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
