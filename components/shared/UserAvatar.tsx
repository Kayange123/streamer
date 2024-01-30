import { cva, type VariantProps } from "class-variance-authority";

interface UserAvatarProps {
  imageUrl: string;
  username: string;
  isLive: boolean;
}

const UserAvatar = ({ isLive, username, imageUrl }: UserAvatarProps) => {
  return <div>UserAvatar</div>;
};

export default UserAvatar;
