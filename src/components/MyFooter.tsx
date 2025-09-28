"use client";

import { Layout } from "antd";

const { Footer } = Layout;
export function MyFooter({ showModal }: { showModal: () => void }) {
  return (
    <Footer style={{ textAlign: "center" }} className="flex items-center justify-center w-full lg:w-[60%] p-0 fixed bottom-0">
      <button className="glass rounded-[10px] lg:rounded-[20px] w-full p-4 text-l lg:text-xl font-bold active:w-[calc(100%-5%)] active:p-2 magic-black bg-beige-gray" onClick={showModal}>
        Добавить новый пост +
      </button>
    </Footer>
  );
}
