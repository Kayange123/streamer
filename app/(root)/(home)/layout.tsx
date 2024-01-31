import Container from "@/components/common/Container";
import SideBar, { SideBarSkeleton } from "@/components/shared/SideBar";
import Navbar from "@/components/shared/navbar";
import React, { Suspense } from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default HomeLayout;
