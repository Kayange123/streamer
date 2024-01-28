import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-3">
        <Image src="/logo.svg" alt="Streamers" height={80} width={80} />
      </div>
    </div>
  );
};
export default Logo;
