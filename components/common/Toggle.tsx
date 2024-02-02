"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import Hint from "../shared/hint";
import { Skeleton } from "../ui/skeleton";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed ? (
        <div className="hidden lg:flex w-full items-center justify-center py-4">
          <Hint label={label} side="right" asChild>
            <Button variant="ghost" className="h-auto p-2" onClick={onExpand}>
              <ArrowRightFromLineIcon className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto ml-auto p-2"
            >
              <ArrowLeftFromLineIcon className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};

export default Toggle;
