type Props = {
  isFollowed: boolean;
  hovered: boolean;
  loading?: boolean;
  onHover: (v: boolean) => void;
  onClick: () => void;
};

export default function FollowButton({
  isFollowed,
  hovered,
  loading,
  onHover,
  onClick,
}: Props) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`${
        isFollowed
          ? "bg-black text-white border border-white/30 hover:bg-red-600/25 hover:text-red-600/85 hover:border-red-600/50"
          : "bg-white text-black hover:bg-white/70"
      } font-bold text-[15px] rounded-4xl p-1 pr-3 pl-3 cursor-pointer`}
    >
      {isFollowed ? (hovered ? "Unfollow" : "Following") : "Follow"}
    </button>
  );
}
