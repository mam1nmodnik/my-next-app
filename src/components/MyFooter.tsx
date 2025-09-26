"use client";
import { Layout } from "antd";

const { Footer } = Layout;
export function MyFooter({ showModal }: { showModal: () => void }) {
  return (
    <Footer style={{ textAlign: "center" }} className="glass">
      <button className="glass rounded-[20px] w-full p-2" onClick={showModal}>
        Добавить новый пост +
      </button>
    </Footer>
  );
}
