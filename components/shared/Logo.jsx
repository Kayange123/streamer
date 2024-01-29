import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const Logo = () => {
  return (
    <Link href="/" className="w-fit">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition w-full">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:shrink lg:mr-0">
          <Image src="/logo.svg" alt="Streamers" height={50} width={50} />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">Streamers</p>
          <p className="text-xs text-muted-foreground">{`Let's Play`}</p>
        </div>
      </div>
    </Link>
  );
};
export default Logo;
