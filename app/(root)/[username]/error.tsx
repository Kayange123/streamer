"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import React from "react";

interface UserErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const UserErrorPage = ({ error, reset }: UserErrorPageProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center space-y-5">
      <p className="">Something went wrong while loading this page!</p>
      <Button asChild onClick={() => reset()}>
        <RefreshCcw className="w-4 h-4" />
        <p className="">Retry</p>
      </Button>
    </div>
  );
};

export default UserErrorPage;
