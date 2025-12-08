import { useDrawerContext } from "@/context/drawer-context";
import Link from "next/link";

export default function ButtonDrawer({
  label,
  icon,
  link,
  click,
}: {
  label: string;
  icon: React.ReactNode;
  link: string;
  click?: () => void;
}) {
  const { onClose } = useDrawerContext();
  function ClickBtn() {
    onClose();
    if (click) click();
  }

  return (
    <Link href={link} onClick={ClickBtn} scroll={false}>
      <span className="flex flex-col h-[75px] items-center text-white w-fit rounded-2xl p-2 hover:bg-gray-700">
        {icon}
        {label}
      </span>
    </Link>
  );
}
