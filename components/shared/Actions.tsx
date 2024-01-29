import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!!!user ? (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href={`/u/${user?.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};

export default Actions;
