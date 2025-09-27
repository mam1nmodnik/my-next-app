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
              contentBg: "bg-gray-800",
              titleColor: 'white',
              titleFontSize: 48,
              titleLineHeight: 1
            },
            Layout: {
              footerBg: "none",
              siderBg: "none",
            },
            Button: {
              textTextActiveColor: 'black',
              textTextColor: 'black'
            }
          },
        }}
      >
        <Layout className="glass-light">
          <Sider className="glass-light flex flex-col">
            <Menu defaultSelectedKeys={["1"]} items={items} className="glass-light" />
          </Sider>
          <Layout className="glass-light">
            <Header style={{ padding: 0 }} className="glass-light" />
            <Content style={{ margin: "16px" }}>{children}</Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </PostsContextProvider>
  );
}
