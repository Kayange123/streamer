import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import LiveBadge from "./live-badge";
import { Skeleton } from "../ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const UserAvatar = ({
  isLive,
  username,
  imageUrl,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-rose-500 ring-2 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage className="object-cover" src={imageUrl} />
        <AvatarFallback>
          {username.charAt(0)}
          {username.charAt(username.length - 1)}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className=" absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const userAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
