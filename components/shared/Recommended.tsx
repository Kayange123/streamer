"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { User } from "@prisma/client";
import React from "react";
import UserItem from "./UserItem";

interface RecommendedProps {
  data: User[];
}

const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="">
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((recommendedUser) => (
          <UserItem
            key={recommendedUser.id}
            data={recommendedUser}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;
