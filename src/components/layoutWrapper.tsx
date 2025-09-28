"use client";

import { PostsContextProvider } from "@/context/postsContext";
import { Layout, Menu, ConfigProvider } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";

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
  return (
    <PostsContextProvider>
      <ConfigProvider
        theme={{
          token: {
            colorLinkActive: 'black'
          },
          components: {
            Modal: {
              contentBg: "#6D6D71",
              titleColor: '#373A3E',
              titleFontSize: 48,
              titleLineHeight: 1
            },
            Layout: {
              footerBg: "none",
              siderBg: "#6D6D71",
            },
            Button: {
              textTextActiveColor: 'black',
              textTextColor: 'black'
            },
          },
        }}
      >
        <Layout className="bg-gray-rabbit min-h-[80vh]">
          <Sider className="flex flex-col bg-gray-rabbit">
            <Menu defaultSelectedKeys={["1"]} items={items} className="bg-gray-rabbit" />
          </Sider>
          <Layout className="">
            <Header style={{ padding: 0 }} className="bg-gray-rabbit"  />
            <Content className="bg-gray-rabbit" >{children}</Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </PostsContextProvider>
  );
}
