import { FaTrashCan } from "react-icons/fa6";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className=" flex flex-row items-center gap-0.5 hover:bg-red-900 p-1.5 cursor-pointer  w-full text-[12px] font-medium text-red-500  hover:text-gray">
      <FaTrashCan width={20} height={20} color="red" />
      <span>Удалить</span>
    </div>
  );
}
