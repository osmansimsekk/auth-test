"use client";

import { Home, ShieldCheck, FileText, User, Lock } from "lucide-react";
import { UserRole } from "@/src/generated/prisma";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SidebarLogOut from "./SidebarLogOut";
import Image from "next/image";
import { useAppSidebar } from "@/providers/AppSidebarProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AppSidebar({
  session,
  fullPostAccess,
}: {
  session: {
    user: {
      name: string;
      role: UserRole;
      image: string;
      lastName: string;
      isVerified: boolean;
    };
  };
  fullPostAccess: { success: boolean };
}) {
  const { setFormType } = useAppSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="invert dark:invert-0"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                <span className="truncate font-semibold text-lg">Profil</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* GENEL GRUBU */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[state=collapsed]:hidden px-4">
            Genel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Ana Sayfa">
                  <Link href="/">
                    <Home />
                    <span>Ana Sayfa</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* PROFİL YÖNETİMİ GRUBU */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[state=collapsed]:hidden px-4">
            Profil Yönetimi
          </SidebarGroupLabel>
          <SidebarMenu>
            {/* Kişisel Bilgiler */}
            <SidebarMenuItem>
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <SidebarMenuButton onClick={() => setFormType("user")}>
                    <User />
                    <span>Kişisel Bilgiler</span>
                  </SidebarMenuButton>
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  align="start"
                  className="w-64 z-100"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Hesap Detayları</h4>
                    <p className="text-xs text-muted-foreground">
                      Ad, soyad ve profil resmi gibi temel bilgilerinizi buradan
                      güncelleyebilirsiniz.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarMenuItem>

            {/* Güvenlik */}
            <SidebarMenuItem>
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <SidebarMenuButton onClick={() => setFormType("password")}>
                    <Lock />
                    <span>Güvenlik</span>
                  </SidebarMenuButton>
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  align="start"
                  className="w-64 z-100"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Güvenlik Ayarları</h4>
                    <p className="text-xs text-muted-foreground">
                      Şifrenizi değiştirebilir ve hesap güvenliği seçeneklerini
                      yönetebilirsiniz.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* YÖNETİM GRUBU */}
        {(session.user.role === UserRole.ADMIN || fullPostAccess.success) && (
          <SidebarGroup>
            <div className="group-data-[state=collapsed]:hidden py-2 px-4">
              <Separator />
            </div>
            <SidebarGroupLabel className="group-data-[state=collapsed]:hidden px-4">
              Yönetim
            </SidebarGroupLabel>
            <SidebarMenu>
              {session.user.role === UserRole.ADMIN && (
                <SidebarMenuItem>
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href="/admin/dashboard">
                          <ShieldCheck className="text-orange-500" />
                          <span>Admin Dashboard</span>
                        </a>
                      </SidebarMenuButton>
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="right"
                      align="start"
                      className="w-64 z-100"
                    >
                      <div className="flex gap-3">
                        <ShieldCheck className="size-5 text-orange-500 shrink-0" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Yönetim Paneli</p>
                          <p className="text-xs text-muted-foreground">
                            Kullanıcı yetkileri ve sistem istatistiklerine tam
                            erişim.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuItem>
              )}

              {fullPostAccess.success && (
                <SidebarMenuItem>
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <SidebarMenuButton>
                        <FileText className="text-blue-500" />
                        <span>Tüm Yazılar</span>
                      </SidebarMenuButton>
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="right"
                      align="start"
                      className="w-64 z-100"
                    >
                      <div className="flex gap-3">
                        <FileText className="size-5 text-blue-500 shrink-0" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">İçerik Yönetimi</p>
                          <p className="text-xs text-muted-foreground">
                            Tüm blog yazılarını, yorumları ve taslakları
                            düzenleyin.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex w-full items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border shrink-0 overflow-hidden">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image} alt="User Avatar" />
                    <AvatarFallback delayMs={500}>
                      <User className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden ml-2">
                  <span className="truncate font-medium">
                    {session.user.name} {session.user.lastName}
                  </span>
                </div>
                <SidebarLogOut />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
