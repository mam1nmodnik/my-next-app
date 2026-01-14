import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export default function LikeCustom({
  toggle,
  click,
  num,
  size,
}: {
  toggle: boolean;
  click: () => void;
  num: number;
  size: string;
}) {
  return (
    <Tooltip placement="leftTop" title={!toggle ? 'Поставить лайк ': 'Убрать лайк'} color="#9CA3AF">
      <div
        onClick={click}
        className="flex flex-row gap-1 items-center select-none"
      >
        {toggle ? (
          <HeartFilled style={{ color: "hotpink", fontSize: `${size}px` }} />
        ) : (
          <HeartOutlined style={{ color: "#9CA3AF", fontSize: `${size}px` }} />
        )}
        <p className="text-[#9CA3AF] text-xs">{num}</p>
      </div>
    </Tooltip>
  );
}
