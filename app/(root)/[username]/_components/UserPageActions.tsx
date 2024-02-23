"use client";

import { onFollow, onUnfollow } from "@/actions/server.actions";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

type UserPageActionsProps = {
  isFollowing: boolean;
  userId: string;
};

const UserPageActions = ({ isFollowing, userId }: UserPageActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success("Unfollowed successfully"))
        .catch((error) => toast.error(error?.message || "Failed to follow"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success("Unfollowed successfully"))
        .catch((error) => toast.error(error?.message || "Failed to unfollow"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <div>
      <h1>UserId: {userId}</h1>
      <Button disabled={isPending || isFollowing} onClick={onClick}>
        Follow
      </Button>
      <Button disabled={isPending || !isFollowing} onClick={onClick}>
        UnFollow
      </Button>
    </div>
  );
};

export default UserPageActions;
