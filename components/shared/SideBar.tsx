import React from "react";
import Wrapper from "../common/Wrapper";
import Toggle from "../common/Toggle";
import Recommended from "./Recommended";
import { getRecommended } from "@/lib/recommended-service";

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

export default SideBar;
