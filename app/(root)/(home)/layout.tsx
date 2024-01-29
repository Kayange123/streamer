import Navbar from "@/components/shared/navbar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}

export default HomeLayout;
