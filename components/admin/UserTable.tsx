"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialogComponent } from "../common/AlertDialog";
import { deleteUserAction } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { Gender, UserRole } from "@/src/generated/prisma";
import { SelectItemComponent } from "./SelectItem";

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
    <Table>
      <TableCaption>List of all users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(users as UserTableUser[]).map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <AlertDialogComponent
                label="Sil"
                dialog="Bu kullanıcı silmeyi onaylıyor musunuz?"
                title="Kullanıcı Silme"
                variant="destructive"
                options={[
                  {
                    type: "continue",
                    text: "Evet",
                    onClick: async () => {
                      const { error } = await deleteUserAction({
                        userId: user.id,
                      });
                      if (error) toast.error(error);
                      if (!error) toast.success("Kullanıcı başarıyla silindi!");
                    },
                  },
                  {
                    type: "cancel",
                    text: "Hayır",
                  },
                ]}
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.gender ?? "N/A"}</TableCell>
            <TableCell>{user.country ?? "N/A"}</TableCell>
            <TableCell>
              <SelectItemComponent
                userId={user.id}
                placeholder={user.role as UserRole}
                options={[
                  { value: UserRole.ADMIN, text: UserRole.ADMIN },
                  { value: UserRole.USER, text: UserRole.USER },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
