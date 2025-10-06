"use client";

import { PostsContextProvider } from "@/context/postsContext";
import { Layout, Menu, ConfigProvider } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { MyFooter } from "./MyFooter";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ModalPostContextProvider } from "@/context/modalPostContext";

const { Sider, Content } = Layout;

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(()=> {
    console.log(pathname)
  }, [pathname])
  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link href="/">Главная</Link>,
    },
    {
      key: "/profile",
      label: <Link href="/profile">Профиль</Link>,
    },
    {
      key: "/myposts",
      label: (
        <Link href="/myposts" scroll={false}>
          Мои посты
        </Link>
      ),
    },
  ];
  return (
    <PostsContextProvider>
      <ModalPostContextProvider>
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
              footerPadding: "none",
              footerBg: "none",
              siderBg: "#6D6D71",
              headerColor: "none",
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
              defaultSelectedKeys={["3"]}
              selectedKeys={[pathname]}
              items={items}
              className="bg-gray-rabbit "
            />
          </Sider>
          <Layout>
            {/* <Header className="bg-gray-rabbit w-auto h-[60px] relative"/> */}
            <Content className="bg-gray-rabbit">{children}</Content>
            <MyFooter />
          </Layout>
        </Layout>
      </ConfigProvider>
      </ModalPostContextProvider>
    </PostsContextProvider>
  );
}
