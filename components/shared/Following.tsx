"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { Follow, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface FollowingProps {
  data: (Follow & { following: User })[];
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem key={follow.following.id} data={follow.following} />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Following;
