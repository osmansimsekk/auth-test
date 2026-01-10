"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { navigationData } from "../../public/data/contants";
import { useIsMobile } from "@/hooks/useMobile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DarkModeToggle } from "@/components/header/DarkModeToggle";
import { signOutAction } from "@/lib/actions/sign-email.action";
import { GuestButtons } from "./GuestButtons";
import { auth } from "@/lib/auth";
import { UserMenuButtons } from "./UserMenuButtons";

const Header = ({
  session,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    setLoggingOut(true);
    const { error } = await signOutAction();
    if (error) {
      setLoggingOut(false);
      toast.error(error);
    } else {
      router.replace("/auth/sign-in");
      toast.success("Başarıyla çıkış yaptınız.");
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* DESKTOP & MOBILE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 grid grid-cols-2 lg:grid-cols-3 items-center border-b-[0.5px] px-4 lg:px-10 bg-background py-2">
        
        {/* 1. Sol Sütun: Logo */}
        <div className="flex justify-start">
          <Link href="/" className="z-50 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="invert dark:invert-0 w-auto h-12 lg:h-16"
            />
          </Link>
        </div>

        {/* 2. Orta Sütun: Desktop Nav (Sadece LG ve üzerinde görünür) */}
        <div className="hidden lg:flex justify-center">
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList>
              {navigationData.map((category) => (
                <NavigationMenuItem key={category.trigger}>
                  <NavigationMenuTrigger>
                    {category.trigger}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col w-[320px] gap-1 p-2">
                      {category.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-md p-2 hover:bg-muted transition"
                            >
                              <div className="font-medium">{item.title}</div>
                              <div className="text-muted-foreground text-sm">
                                {item.description}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 3. Sağ Sütun: Butonlar & Hamburger (Hizalama Sağda) */}
        <div className="flex items-center justify-end gap-2 lg:gap-4">
          {/* Sadece Desktop'ta görünen butonlar */}
          <div className="hidden lg:flex gap-4 items-center">
            <DarkModeToggle />
            {!session ? (
              <GuestButtons variant="desktop" />
            ) : (
              <div className="flex gap-4 items-center">
                <Button asChild variant="outline">
                  <Link href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    {session.user.name}
                  </Link>
                </Button>
                <Button
                  disabled={isLoggingOut}
                  variant="destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış Yap
                </Button>
              </div>
            )}
          </div>

          {/* Sadece Mobil'de görünen Hamburger Menü */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              className="-mr-2 hover:bg-transparent"
            >
              <Menu className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU (OVERLAY) */}
      <header
        className={`fixed inset-0 z-[9999] flex flex-col bg-background transition-all duration-300 ${
          menuOpen
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
      >
        {/* Mobile Menu Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="invert dark:invert-0"
          />
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Button  size="icon" onClick={() => setMenuOpen(false)}>
              <X className="w-7 h-7" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col flex-1 justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Accordion type="single" collapsible className="w-full">
              {navigationData.map((category, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={category.trigger}
                  className="border-b border-muted/50"
                >
                  <AccordionTrigger className="text-xl font-medium hover:no-underline py-5">
                    {category.trigger}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-6 pl-2 pb-4 mt-2">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="group"
                        >
                          <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* MOBİL BUTONLAR: Alt Kısım */}
          <div className="p-6 bg-muted/20 border-t w-full mt-auto">
            <div className="w-full flex flex-col items-stretch gap-3 
              [&_button]:w-full [&_button]:flex [&_button]:justify-center [&_button]:items-center
              [&_a]:w-full [&_a]:flex [&_a]:justify-center [&_a]:items-center">
              {!session ? (
                <GuestButtons
                  variant="mobile"
                  onClick={() => setMenuOpen(false)}
                />
              ) : (
                <UserMenuButtons
                  variant="mobile"
                  userName={session.user.name}
                  userImage={session.user.image || ""}
                  isLoggingOut={isLoggingOut}
                  onSignOut={handleSignOut}
                  onCloseMenu={() => setMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;