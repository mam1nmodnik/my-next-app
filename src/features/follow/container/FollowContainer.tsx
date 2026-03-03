import { useState } from "react";
import FollowButton from "../ui/FollowButton";
import { useFollowUser } from "../model/useFollowUser";
import { useSession } from "next-auth/react";

type Props = {
  userId: number;
  isFollowedByMe: boolean;
};

export default function FollowContainer({ userId, isFollowedByMe }: Props) {
  const [hovered, setHovered] = useState(false);
  const { follow, unfollow, isLoading } = useFollowUser(userId);
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) return null;
    if (isFollowedByMe) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <FollowButton
      isFollowed={isFollowedByMe}
      hovered={hovered}
      loading={isLoading}
      onHover={setHovered}
      onClick={handleClick}
    />
  );
}
