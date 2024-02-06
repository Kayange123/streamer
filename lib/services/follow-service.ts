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

export const followUser = async (id: string) => {
  const user = await getLoggedUser();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) throw new Error(`User ${id} does not exist`);

  if (otherUser.id === user.id) throw new Error("You can not follow yourself");

  const existingFollow = await db.follow.findFirst({
    where: { followerId: user?.id, followingId: otherUser.id },
  });

  if (existingFollow) throw new Error("You already follow");

  const follow = await db.follow.create({
    data: { followerId: user.id, followingId: otherUser.id },
    include: { follower: true, following: true },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  try {
    const self = await followUser(id);

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) throw new Error("Can not unfollow yourself");

    const existingFollow = await db.follow.findFirst({
      where: { followerId: self.id, followingId: otherUser.id },
    });

    if (!existingFollow) throw new Error("Not following");
    const follow = await db.follow.delete({
      where: { id: existingFollow.id },
      include: { following: true },
    });

    return follow;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};
