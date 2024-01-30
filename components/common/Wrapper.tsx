"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);
  return (
    <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50", collapsed && "w-[70px]")}>
      {children}
    </aside>
  );
};

export default Wrapper;
