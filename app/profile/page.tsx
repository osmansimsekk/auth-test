import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { UserRole } from "@/src/generated/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ShieldCheck,
  Mail,
  Settings2,
  LayoutDashboard,
  Lock,
  Unlock,
  User,
  CircleUserRound,
  Globe,
  CheckIcon,
} from "lucide-react";
import Link from "next/link";
import UpdateContent from "@/components/page/UpdateContent";
import { getCountryByCode } from "@/lib/countries";

const Profile = async () => {
  const headersList = await headers();
  const session: Awaited<ReturnType<typeof auth.api.getSession>> =
    await auth.api.getSession({ headers: headersList });

  if (!session) redirect("/auth/sign-in");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: { permissions: { posts: ["update", "delete"] } },
  });

  const user = session.user;

  return (
    <div className="container max-w-6xl py-10 px-4 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/20 p-6 rounded-2xl border">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Profil Yönetimi
            </h1>
            <p className="text-sm text-muted-foreground">
              Hesabınızın güvenliğini ve tercihlerini kontrol edin.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user.role === UserRole.ADMIN && (
            <Button
              variant="outline"
              asChild
              className="rounded-full shadow-sm hover:bg-primary hover:text-white transition-all"
            >
              <Link href="/admin/dashboard" className="gap-2">
                <LayoutDashboard size={16} /> Admin Panel
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-xl bg-linear-to-b from-card to-muted/10">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-2xl">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="bg-primary text-2xl text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">
                {user.name} {user.lastName}
              </CardTitle>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline" className="px-3 py-1 bg-background/50">
                  {user.role === "ADMIN" ? "Yönetici" : "Kullanıcı"}
                </Badge>
                {user.role === UserRole.ADMIN && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="cursor-help">
                        <Badge
                          variant={
                            FULL_POST_ACCESS.success ? "default" : "secondary"
                          }
                          className="gap-1"
                        >
                          {FULL_POST_ACCESS.success ? (
                            <Unlock size={12} />
                          ) : (
                            <Lock size={12} />
                          )}
                          Erişim Seviyesi
                        </Badge>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full h-fit">
                          <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            @Yetki Detayları
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {FULL_POST_ACCESS.success
                              ? "Sistemdeki tüm gönderileri güncelleme ve silme yetkisine sahipsiniz (Admin)."
                              : "Sadece kendi oluşturduğunuz içerikler üzerinde işlem yapabilirsiniz."}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="p-3 rounded-lg bg-background/50 border space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User size={16} />
                  <span className="text-foreground">
                    {user.name} {user.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleUserRound size={16} />
                  <span className="text-foreground">
                    {user.gender === "MALE" ? "Erkek" : "Kadın"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon size={16} />
                  <span className="text-foreground">
                    {user.emailVerified
                      ? "Doğrulanmış Hesap"
                      : "Hesabınız Doğrulanmamış"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} />

                  <span className="text-foreground">
                    {getCountryByCode(user.country)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <span className="text-foreground">{user.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="border-b bg-muted/5">
              <div className="flex items-center gap-3">
                <Settings2 className="text-primary" />
                <div>
                  <CardTitle>Profil Bilgilerini Güncelle</CardTitle>
                  <CardDescription>
                    Bilgileriniz sistem genelinde bu şekilde görünecektir.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-w-xl mx-auto lg:mx-0">
                <UpdateContent session={session} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
