"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import LiveBadge from "./live-badge";
import { Skeleton } from "../ui/skeleton";

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
            {!collapsed && <p className="truncate">{data?.username}</p>}
            {!collapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
        </Link>
      </Button>
    </li>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center px-3 py-2 gap-x-4">
      <Skeleton className="max-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export default UserItem;
