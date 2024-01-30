"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

interface UserItemProps {
  data: User;
  isLive: boolean;
}

const UserItem = ({ data, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const href = `/${data?.username}`;
  const isActive = pathname === href;
  return (
    <li>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full h-5",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              "flex items-center w-full gap-x-4",
              collapsed && "justify-center"
            )}
          >
            <UserAvatar
              imageUrl={data?.imageUrl}
              username={data?.username}
              isLive={isLive}
            />
          </div>
        </Link>
      </Button>
    </li>
  );
};

export default UserItem;
