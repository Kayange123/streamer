"use server";

import { blockUser, unblockUser } from "@/lib/services/block-service";
import { followUser, unfollowUser } from "@/lib/services/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const onBlock = async (id: string) => {
  try {
    const blockedUser = await blockUser(id);
    revalidatePath("/");
    if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);

    return blockedUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const blockedUser = await unblockUser(id);
    revalidatePath("/");
    if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);

    return blockedUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};
