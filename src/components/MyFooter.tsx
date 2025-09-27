"use client";

import { Layout } from "antd";

const { Footer } = Layout;
export function MyFooter({ showModal }: { showModal: () => void }) {
  return (
    <Footer style={{ textAlign: "center" }} className="flex items-center justify-center w-full">
      <button className="glass rounded-[20px] w-full p-4 text-xl font-bold active:w-[calc(100%-5%)] active:p-2" onClick={showModal}>
        Добавить новый пост +
      </button>
    </Footer>
  );
}
