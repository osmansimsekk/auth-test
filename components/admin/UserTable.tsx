"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialogComponent } from "../common/AlertDialog";
import { deleteUserAction } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { Gender, UserRole } from "@/src/generated/prisma";
import { SelectItemComponent } from "./SelectItem";
import { Users, ShieldCheck, Settings2, MoveLeft } from "lucide-react";
import { Button } from "../ui/button";

export type UserTableUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  gender: Gender;
  country: string;
  role?: UserRole;
};

export function UserTable({ users }: { users: UserTableUser[] }) {
  return (
    <div className="space-y-8 w-full pb-10">
      <Button asChild>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
        >
          <MoveLeft />
          Ana Sayfaya Dön
        </Link>
      </Button>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-lg border border-slate-700">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-medium tracking-wider uppercase text-[10px]">
              <Settings2 className="w-3 h-3" />
              <span>Sistem Paneli</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Kullanıcı <span className="text-blue-400">Yönetimi</span>
            </h1>
            <p className="max-w-[600px] text-slate-400 text-sm leading-relaxed">
              Platform genelindeki tüm kullanıcı hesaplarını denetleyin. Yetki
              seviyelerini düzenleyebilir, kullanıcı verilerini inceleyebilir
              veya kayıtları güvenli bir şekilde silebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 min-w-[120px]">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                Toplam Kayıt
              </span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-2xl font-bold text-white">
                  {users.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[80px] text-center text-xs uppercase tracking-wider font-bold">
                  İşlem
                </TableHead>
                <TableHead className="font-semibold">Ad Soyad</TableHead>
                <TableHead className="hidden md:table-cell font-semibold">
                  E-posta Adresi
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Cinsiyet
                </TableHead>
                <TableHead className="font-semibold ">Ülke</TableHead>
                <TableHead className="w-[180px] font-semibold ">
                  Yetkilendirme
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground italic"
                  >
                    Henüz kayıtlı bir kullanıcı bulunmuyor.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-muted/20 transition-all duration-200"
                  >
                    <TableCell className="text-center">
                      <AlertDialogComponent
                        label="Sil"
                        dialog={`${user.name} ${user.lastName} isimli kullanıcıyı silmek istediğinize emin misiniz?`}
                        title="Kullanıcıyı Sil"
                        variant="destructive"
                        options={[
                          {
                            type: "continue",
                            text: "Kalıcı Olarak Sil",
                            onClick: async () => {
                              const { error } = await deleteUserAction({
                                userId: user.id,
                              });
                              if (error) toast.error(error);
                              else toast.success("Kullanıcı silindi.");
                            },
                          },
                          { type: "cancel", text: "Vazgeç" },
                        ]}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                          {user.name[0]}
                          {user.lastName[0]}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="font-semibold text-foreground">
                            {user.name} {user.lastName}
                          </span>
                          <span className="text-[11px] text-muted-foreground md:hidden">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="font-medium text-[11px] px-2.5 py-0.5 rounded-full"
                      >
                        {user.gender === "FEMALE" ? "Kadın" : "Erkek"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {user.country || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role === UserRole.ADMIN && (
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <SelectItemComponent
                          userId={user.id}
                          placeholder={user.role as UserRole}
                          options={[
                            { value: UserRole.ADMIN, text: "Yönetici (Admin)" },
                            {
                              value: UserRole.USER,
                              text: "Standart Kullanıcı",
                            },
                          ]}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
