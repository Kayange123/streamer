"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {!collapsed ? (
        <div className="hidden lg:flex w-full items-center justify-center py-4">
          <Button variant="ghost" className="h-auto p-2" onClick={onExpand}>
            <ArrowRightFromLineIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Button
            onClick={onCollapse}
            variant="ghost"
            className="h-auto ml-auto p-2"
          >
            <ArrowLeftFromLineIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Toggle;
