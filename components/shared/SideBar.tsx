import React from "react";
import Wrapper from "../common/Wrapper";
import Toggle, { ToggleSkeleton } from "../common/Toggle";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import { getRecommended } from "@/lib/services/recommended-service";
import { getFollowedUsers } from "@/lib/services/follow-service";
import Following, { FollowingSkeleton } from "./Following";

const SideBar = async () => {
  const recommendedUsers = await getRecommended();
  const followings = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="pt-4 lg:pt-0 space-y-4">
        <Following data={followings} />
        <Recommended data={recommendedUsers} />
      </div>
    </Wrapper>
  );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r order-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
