import { Popconfirm } from "antd";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <Popconfirm
        title="Вы уверены?"
        onConfirm={() => onClick()}
        okText="Да"
        cancelText="Нет"
        className="static"
        >
        <button className="bg-red-500 hover:bg-red-900  p-2 cursor-pointer md:w-20 w-fit rounded-[6px] text-[12px]  font-medium  text-white hover:text-gray">
            Удалить
        </button>
        </Popconfirm>
    );
}
