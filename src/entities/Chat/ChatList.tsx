import ChatItem from "./ChatItem";
import { ItemType } from "./type";

const array: ItemType[] = [
  {
    id: "1",
    name: "tesla",
    date: "14 марта",
    avatar: null,
    text: "привет",
  },
  {
    id: "2",
    name: "tesla",
    date: "14 марта",
    avatar: null,
    text: "привет",
  },
  {
    id: "3",
    name: "tesla",
    date: "14 марта",
    avatar: null,
    text: "привет",
  },
  {
    id: "4",
    name: "tesla",
    date: "14 марта",
    avatar: null,
    text: "привет",
  },
];
export default function ChatList() {
  return (
    <div className="flex flex-col overflow-y-auto">
      {array.map((el) => (
        <ChatItem key={el.id} {...el} />
      ))}
    </div>
  );
}
