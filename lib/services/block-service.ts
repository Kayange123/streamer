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
