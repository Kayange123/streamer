import { getLoggedUser } from "./auth-service";
import { db } from "../db";

export const getRecommended = async () => {
  let userId;

  try {
    const userLoggedIn = await getLoggedUser();
    userId = userLoggedIn.id;
  } catch (error) {
    userId = null;
  }

  const condition = !!userId
    ? {
        AND: [
          { NOT: { id: userId } },
          { NOT: { followers: { some: { followerId: userId } } } },
          { NOT: { blocking: { some: { blockedId: userId } } } },
        ],
      }
    : {};

  const users = await db.user.findMany({
    where: condition,
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return users;
};
