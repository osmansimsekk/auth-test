import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="lg:w-1/2 w-screen flex items-center justify-center mx-auto lg:px-20 px-10 flex-col gap-10">
      <p className="text-2xl border-b-3 py-1 ">
        Başarıyla kayıt oldunuz.
        <br /> Hesabınızı onaylamak için emailinizi kontrol edin.
      </p>

      <Button>
        <Link href="/">Ana Sayfaya Dön</Link>
      </Button>
    </div>
  );
};

export default Page;
