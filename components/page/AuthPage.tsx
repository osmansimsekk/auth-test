import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {
  return (
    <Link
      href="/"
      className="w-1/2 hidden items-center justify-center border-l-[0.1px] border-white/10 lg:flex group dark:hover:bg-white transition-all duration-300 ease-in dark:bg-background bg-white hover:bg-black"
    >
      <section>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="transition-all duration-300 ease-in-out dark:invert-0 dark:group-hover:invert invert group-hover:invert-0"
        />
      </section>
    </Link>
  );
};

export default AuthPage;
