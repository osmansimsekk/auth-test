"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, UserPlus, LogOut } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { navigationData } from "../public/data/contants";
import { useIsMobile } from "@/hooks/useMobile";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { useState } from "react";

import { DarkModeToggle } from "./DarkModeToggle";

const Header = ({
  session,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Başarıyla çıkış yaptınız!");
          router.replace("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center border-b-[0.5px] px-6 lg:px-10 bg-background py-2">
        {/* Logo */}
        <Link href="/" className="z-50">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="invert dark:invert-0"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 lg:flex justify-center">
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

        {/* Desktop Auth */}
        <div className="hidden lg:flex gap-4 items-center">
          <DarkModeToggle />

          {!session ? (
            <>
              <Link href="/sign-in">
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Üye Ol
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/profile">
                <Button>
                  <User />
                  <p>Profil</p>
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={async () => {
                  await handleSignOut();
                }}
              >
                <span>Çıkış Yap</span>
                <LogOut />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden ml-auto z-50">
          <Button
            variant="default"
            size="icon"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </Button>
        </div>
      </header>

      <div
        className={`
    fixed inset-0 z-9999
    flex items-center justify-center
    bg-background/90
    transition-all duration-300 ease-out
    ${
      menuOpen
        ? "opacity-100 backdrop-blur-md visible"
        : "opacity-0 backdrop-blur-0 invisible"
    }
  `}
      >
        {/* Close */}

        <Button
          variant="default"
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5"
        >
          <X className="w-5 h-5" />
        </Button>
        <DarkModeToggle className="absolute top-15 right-5" />

        {/* Menu Content */}
        <nav
          className={`
      w-full max-w-md px-6
      transition-all duration-300 ease-out
      ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
    `}
        >
          <div className="flex flex-col gap-10">
            {navigationData.map((category) => (
              <div key={category.trigger}>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  {category.trigger}
                </p>

                <div className="flex flex-col gap-3">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-base font-medium hover:text-primary transition"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Auth */}
            <div className="pt-6 border-t flex flex-col gap-3">
              {!session ? (
                <>
                  <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm gap-2"
                    >
                      <User className="h-4 w-4" />
                      Giriş Yap
                    </Button>
                  </Link>

                  <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full h-11 text-sm gap-2">
                      <UserPlus className="h-4 w-4" />
                      Üye Ol
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button onClick={() => setMenuOpen(false)}>
                    <Link href="/profile" className="flex gap-2">
                      <User />
                      <p>Profile</p>
                    </Link>
                  </Button>
                  <Button
                    onClick={async () => {
                      await handleSignOut();
                      setMenuOpen(false);
                    }}
                  >
                    <LogOut />
                    Çıkış Yap
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
