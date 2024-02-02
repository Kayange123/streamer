import { currentUser } from "@clerk/nextjs";
import { db } from "../db";

export const getLoggedUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized access to streamers");
  }

  const userDB = await db.user.findUnique({
    where: { externalUserId: user?.id },
  });

  if (!userDB) throw new Error("Not Found");

  return userDB;
};
