"use client";

import { PostsContextProvider } from "@/context/postsContext";
import { Layout, Menu, ConfigProvider, Modal } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/">Главная</Link>,
  },
  {
    key: "2",
    label: <Link href="/profile">Профиль</Link>,
  },
  {
    key: "3",
    label: <Link href="/myposts">Мои посты</Link>,
  },
];
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const handleCancel = () => setOpenWindow((op) => !op);

  return (
    <PostsContextProvider>
      <ConfigProvider
        theme={{
          token: {
            colorLinkActive: "black",
          },
          components: {
            Modal: {
              contentBg: "#6D6D71",
              titleColor: "#373A3E",
              titleFontSize: 48,
              titleLineHeight: 1,
            },
            Layout: {
              footerBg: "none",
              siderBg: "#6D6D71",
              headerColor: 'none',
              headerHeight: 0,
            },
            Button: {
              textTextActiveColor: "black",
              textTextColor: "black",
            },
          },
        }}
      >
        <Layout className="bg-gray-rabbit ">
          <Sider className="lg:flex flex-col bg-gray-rabbit hidden ">
            <Menu
              defaultSelectedKeys={["1"]}
              items={items}
              className="bg-gray-rabbit "
            />
          </Sider>
          <Layout>
            <Header className="bg-gray-rabbit lg:block hidden"/>
              <button
                className="lg:hidden absolute top-2.5 right-5 w-15 h-15 glass-light rounded-2xl"
                onClick={handleCancel}
              >
                Меню
              </button>
              <Modal
                open={openWindow}
                onCancel={handleCancel}
                footer={null}
                mask={true}
                className="w-fit bg-none glass"
              >
                <div className="flex flex-col text-2xl gap-4 w-full">
                  <Link href="/" onClick={handleCancel}>Главная</Link>
                  <Link href="/profile" onClick={handleCancel}>Профиль</Link>
                  <Link href="/myposts" onClick={handleCancel}>Мои посты</Link>
                </div>
              </Modal>
            
            <Content className="bg-gray-rabbit">{children}</Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </PostsContextProvider>
  );
}
