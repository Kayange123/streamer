"use client"

import { onFollow, onUnfollow } from "@/actions/server.actions";
import React, { useTransition } from "react";

type UserPageActionsProps = {
  isFollowing: boolean;
  userId: string;
};

const UserPageActions = ({ isFollowing, userId }: UserPageActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() =>
      onFollow(userId)
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    );
  };
  const handleUnfollow = () => {
    startTransition(() =>
      onUnfollow(userId)
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    );
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return <div>UserPageActions</div>;
};

export default UserPageActions;
