
import LikeButton from "../ui/LikeButton";
import { useLikePost } from "@/hooks/useLikePost";

type Props = {
  postId: number;
  isLiked: boolean;
  likesCount: number;
};

export default function LikeContainer({ postId, isLiked, likesCount }: Props) {
  const likeMutation = useLikePost(postId);
  const handleClick = () => {
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
