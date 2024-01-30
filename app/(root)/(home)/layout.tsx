import Container from "@/components/common/Container";
import SideBar from "@/components/shared/SideBar";
import Navbar from "@/components/shared/navbar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default HomeLayout;
