import { useSession } from "next-auth/react";
import LikeButton from "../ui/LikeButton";
import { useLikePost } from "@/components/features/like/model/useLikePost";

type Props = {
  postId: number;
  isLiked: boolean;
  likesCount: number;
};

export default function LikeContainer({ postId, isLiked, likesCount }: Props) {
  const likeMutation = useLikePost(postId);
  const { data: session } = useSession();
  const handleClick = () => {
    if (!session) return null;
    likeMutation.like();
  };

  return (
    <LikeButton
      isLiked={isLiked}
      likesCount={likesCount}
      onClick={handleClick}
    />
  );
}
