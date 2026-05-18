import { HeartFilled, HeartOutlined } from "@ant-design/icons";

type Props = {
  isLiked: boolean;
  likesCount: number;
  onClick: () => void;
  size?: number;
};

export default function LikeButton({
  isLiked,
  likesCount,
  onClick,
  size = 20,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row gap-1 items-center select-none cursor-pointer group"
    >
      {isLiked ? (
        <HeartFilled
          style={{ color: "hotpink", fontSize: size }}
          className="transition-all group-hover:scale-110"
        />
      ) : (
        <HeartOutlined
          style={{ color: "#9CA3AF", fontSize: size }}
          className="transition-all group-hover:scale-110"
        />
      )}
      <p className="text-[#9CA3AF] text-xs">{likesCount}</p>
    </div>
  );
}
