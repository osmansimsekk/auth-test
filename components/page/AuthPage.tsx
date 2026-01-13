import { Shield } from "lucide-react";
import Link from "next/link";

const AuthPage = () => {
  return (
    <Link
      href="/"
      className="w-1/2 hidden items-center justify-center border-l-[1px] border-border lg:flex group transition-all duration-500 ease-in-out dark:bg-background bg-slate-50 hover:bg-primary dark:hover:bg-primary"
    >
      <section className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Arka plan parlama efekti */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-white/20 transition-colors" />

          <div className="relative bg-background dark:bg-muted p-8 rounded-3xl border border-border group-hover:border-transparent group-hover:scale-110 transition-all duration-500 shadow-2xl">
            <Shield
              size={120}
              strokeWidth={1.5}
              className="text-primary transition-colors duration-500"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter group-hover:text-primary-foreground transition-colors duration-500">
            Auth<span className="font-light opacity-70">Project</span>
          </h1>
          <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500 font-medium"></p>
        </div>
      </section>
    </Link>
  );
};

export default AuthPage;
