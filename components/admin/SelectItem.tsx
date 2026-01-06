"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { admin } from "@/lib/auth-client";
import { UserRole } from "@/src/generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  label?: string;
  placeholder: string;
  options: {
    value: string;
    text: string;
  }[];
  userId: string;
};

export function SelectItemComponent({ options, placeholder, userId }: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleChange = async (value: UserRole) => {
    const hasPermission = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });

    if (!hasPermission.data?.success)
      return toast.error("Rol değişimi için yetkiniz yok.");

    await admin.setRole({
      userId,
      role: value,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Rol başarıyla değiştirildi.");
          router.refresh();
        },
      },
    });
  };

  return (
    <Select onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
