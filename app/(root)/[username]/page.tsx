import { isFollowingUser } from "@/lib/services/follow-service";
import { getUserByUsername } from "@/lib/services/user-service";
import { User } from "@prisma/client";
import React from "react";
import UserPageActions from "./_components/UserPageActions";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: UserPageProps) => {
  let user: User;
  let isFollowing: boolean;
  try {
    user = (await getUserByUsername(username)) as User;
    isFollowing = await isFollowingUser(user?.id);
  } catch (error) {
    throw new Error("User Not Found");
  }
  return (
    <div>
      <UserPageActions isFollowing={isFollowing} userId={user?.id} />
    </div>
  );
};

export default UserPage;
