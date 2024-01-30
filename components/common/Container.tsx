"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <div className={cn("flex-1 ml-[70px]", !collapsed && "lg:ml-60")}>
      {children}
    </div>
  );
};

export default Container;
