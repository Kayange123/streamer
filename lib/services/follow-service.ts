import { db } from "../db";
import { getLoggedUser } from "./auth-service";

export const isFollowingUser = async (userId: string) => {
  try {
    const loginUser = await getLoggedUser();
    const otherUser = await db.user.findUnique({
      where: { id: userId },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === loginUser.id) {
      return true;
    }
    const existingFollower = await db.follow.findFirst({
      where: { followerId: loginUser.id, followingId: otherUser.id },
    });

    return !!existingFollower;
  } catch (error) {
    return false;
  }
};
