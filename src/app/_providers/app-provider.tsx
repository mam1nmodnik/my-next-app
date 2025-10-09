"use client";
import { ModalPostContextProvider } from "@/context/modalPostContext";
import { PostsContextProvider } from "@/context/postsContext";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <PostsContextProvider>
      <ModalPostContextProvider>
        <ConfigProvider
          theme={{
            token: {
              colorLinkActive: "black",
              colorLink: "#fff",
              colorLinkHover: "#60a5fa",
            },
            components: {
              Modal: {
                contentBg: "#6D6D71",
                titleColor: "#373A3E",
                titleFontSize: 48,
              },
              Layout: {
                headerBg: "transparent",
                footerBg: "transparent",
                footerPadding: "none",
                siderBg: "transparent",
              },
              Button: {
                colorText: "black",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </ModalPostContextProvider>
    </PostsContextProvider>
  );
}
