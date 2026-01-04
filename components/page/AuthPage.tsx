import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {
  return (
    <Link
      href="/"
      className="w-1/2 hidden items-center justify-center bg-background border-l-[0.1px] border-white/10 lg:flex group hover:bg-white transition-all duration-300 ease-in"
    >
      <section>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="group-hover:invert transition-all duration-300 ease-in"
        />
      </section>
    </Link>
  );
};

export default AuthPage;
