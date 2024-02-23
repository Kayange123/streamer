"use client";
import { Toaster } from "sonner";
import { useIsClient } from "usehooks-ts";

const ToasterProvider = () => {
  const isClient = useIsClient();
  if (!isClient) {
    return;
  }
  return <Toaster position="bottom-center" />;
};

export default ToasterProvider;
