"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Database,
  Zap,
  LayoutTemplate,
  Github,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
      });

      gsap.from(".code-window", {
        x: 100,
        autoAlpha: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5,
      });

      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        },
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".blob", {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="blob absolute bottom-1/4 right-1/4 w-125 h-125 bg-chart-2/10 blur-[150px] rounded-full" />
      </div>

      <section className="container mx-auto px-6 pt-32 lg:pt-48 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next.js 16 Auth Mimarisi
            </div>

            <h1 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Modern Auth <br /> Better Auth.
            </h1>

            <p className="reveal-text text-muted-foreground text-lg md:text-xl max-w-xl mb-10 font-figtree font-light tracking-tight">
              Bu proje, Next.js 16 ve modern web teknolojilerini kullanarak
              Better Auth kütüphanesini öğrenmek amacıyla geliştirilmiştir.
            </p>

            <div className="reveal-text flex flex-wrap gap-4">
              <Button className="group py-6 rounded-2xl" asChild>
                <Link href="/auth/sign-in">
                  Hemen Başla
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="group py-6 rounded-2xl"
                asChild
              >
                <Link
                  href="https://github.com/osmansimsekk/auth-test"
                  target="_blank"
                >
                  GitHub
                  <Github />
                </Link>
              </Button>
            </div>
          </div>

          <div className="code-window relative hidden lg:block">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-chart-2/20 rounded-2xl blur opacity-30" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden font-mono text-[13px] leading-relaxed">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-[10px]">
                    auth.ts
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-hidden">
                <code className="block text-white/80 whitespace-pre">
                  <span className="text-purple-400">export const</span>{" "}
                  <span className="text-blue-400">auth</span> ={" "}
                  <span className="text-yellow-400">betterAuth</span>({"{"}
                  {"\n"} database:{" "}
                  <span className="text-yellow-400">prismaAdapter</span>
                  (prisma),
                  {"\n"} emailAndPassword: {"{"}
                  {"\n"} enabled: <span className="text-orange-400">true</span>,
                  {"\n"} requireEmailVerification:{" "}
                  <span className="text-orange-400">true</span>,{"\n"} {"}"},
                  {"\n\n"}{" "}
                  <span className="text-white/40">
                    {"//"} Özel Kullanıcı Alanları
                  </span>
                  {"\n"} user: {"{"}
                  {"\n"} additionalFields: {"{"}
                  {"\n"} gender: {"{"} type:{" "}
                  <span className="text-green-400">
                    &quot;MALE | FEMALE&quot;
                  </span>{" "}
                  {"}"},{"\n"} country: {"{"} type:{" "}
                  <span className="text-green-400">&quot;string&quot;</span>{" "}
                  {"}"},{"\n"} role: {"{"} type:{" "}
                  <span className="text-green-400">
                    &quot;ADMIN | USER&quot;
                  </span>{" "}
                  {"}"},{"\n"} {"}"}
                  {"\n"} {"}"},{"\n\n"} databaseHooks: {"{"}
                  {"\n"} user: {"{"} create: {"{"} before:{" "}
                  <span className="text-purple-400">async</span> (user){" "}
                  <span className="text-blue-400">=&gt;</span> ... {"}"} {"}"}
                  {"\n"} {"}"}
                  {"\n"}
                  {"}"})
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          <div className="bento-card md:col-span-2 md:row-span-1 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <ShieldCheck className="text-primary w-8 h-8" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Oturum Yönetimi
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Better Auth Entegrasyonu
              </h3>
              <p className="text-muted-foreground text-sm max-w-md font-figtree">
                Next.js ekosistemiyle tam uyumlu, session ve güvenlik
                süreçlerini optimize eden güçlü yapı.
              </p>
            </div>
          </div>

          <div className="bento-card p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm flex flex-col justify-center items-center text-center gap-4 group">
            <div className="p-3 rounded-2xl bg-primary/5 group-hover:scale-110 transition-transform">
              <Database className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-medium text-sm tracking-tight leading-5">
              Neon Serverless DB <br /> Veritabanı Yönetimi
            </h3>
          </div>

          <div className="bento-card p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm flex flex-col justify-center items-center text-center gap-4 group">
            <div className="p-3 rounded-2xl bg-primary/5 group-hover:scale-110 transition-transform">
              <Zap className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-medium text-sm tracking-tight leading-5">
              Prisma ORM <br /> Tip Güvenli Erişim
            </h3>
          </div>

          <div className="bento-card md:col-span-2 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm flex items-center gap-8 overflow-hidden">
            <div className="min-w-fit">
              <LayoutTemplate className="text-primary w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold">Modern Shadcn UI</h3>
              <p className="text-muted-foreground text-sm font-figtree leading-relaxed">
                Şık arayüz bileşenleri ve kullanıcı dostu tasarım pratikleri.
              </p>
            </div>
            <div className="hidden lg:block w-full h-32 bg-muted/40 rounded-xl border border-border translate-y-8 rotate-3 shadow-2xl" />
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-border/50 text-center">
        <p className="text-muted-foreground text-sm font-figtree">
          Bu proje Better Auth kütüphanesini öğrenmek amacıyla yapıldı.
        </p>
      </footer>
    </div>
  );
};

export default Home;
