import { db } from "../db";
import { getLoggedUser } from "./auth-service";

export const isBlockedByUser = async (id: string): Promise<Boolean> => {
  try {
    const user = await getLoggedUser();

    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) throw new Error("User not found");

    if (user.id === otherUser.id) {
      return false;
    }
    const existingBlock = await db.blocker.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: user.id,
          blockerId: otherUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  try {
    const user = await getLoggedUser();

    if (user.id === id) throw new Error("You can not block yourself");

    const existingBlock = await db.blocker.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: id,
          blockerId: user.id,
        },
      },
    });
    if (existingBlock) throw new Error("You already blocked");

    const block = await db.blocker.create({
      data: {
        blockedId: id,
        blockerId: user.id,
      },
      include: { blocked: true },
    });
    return block;
  } catch (error) {
    throw new Error("Failed to block user");
  }
};

export const unblockUser = async (id: string) => {
  try {
    const user = await getLoggedUser();

    if (user.id === id) throw new Error("You can not unblock yourself");

    const existingBlock = await db.blocker.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: id,
          blockerId: user.id,
        },
      },
    });

    if (!existingBlock) throw new Error("You have not blocked this user");

    const unblocked = await db.blocker.delete({
      where: {
        id: existingBlock.id,
      },
      include: { blocked: true },
    });
    return unblocked;
  } catch (error) {
    throw new Error("Failed to block user");
  }
};
