"use client";

import { PostsContextProvider } from "@/context/postsContext";
import { Layout, Menu } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
      <Layout  className="glass">
        <Sider className="glass flex flex-col">
          <Menu defaultSelectedKeys={["1"]} items={items} className="glass" />
        </Sider>
        <Layout className="glass">
          <Header style={{ padding: 0 }} className="glass" />
          <Content style={{ margin: "16px" }}>{children}</Content>
        </Layout>
      </Layout>
    </PostsContextProvider>
  );
}
