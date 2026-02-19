import { useFollowUser } from "@/components/features/follow/model/useFollowUser";
import { useState } from "react";
import FollowButton from "../ui/FollowButton";

type Props = {
  userId: number;
  isFollowedByMe: boolean;
};

export default function FollowContainer({ userId, isFollowedByMe }: Props) {
  const [hovered, setHovered] = useState(false);
  const { follow, unfollow, isLoading } = useFollowUser(userId);

  return (
    <FollowButton
      isFollowed={isFollowedByMe}
      hovered={hovered}
      loading={isLoading}
      onHover={setHovered}
      onClick={isFollowedByMe ? unfollow : follow}
    />
  );
}
