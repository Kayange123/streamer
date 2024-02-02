import React from "react";
import Wrapper from "../common/Wrapper";
import Toggle from "../common/Toggle";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import { getRecommended } from "@/lib/services/recommended-service";

const SideBar = async () => {
  const recommendedUsers = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="pt-4 lg:pt-0 space-y-4">
        <Recommended data={recommendedUsers} />
      </div>
    </Wrapper>
  );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r order-[#2D2E35] z-50">
      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
