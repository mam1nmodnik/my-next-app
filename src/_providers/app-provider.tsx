"use client";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserContextProvider } from "./infra/user-provider";
import { DrawerContextProvider } from "./ui/drawer-provider";
import { MessageContextProvider } from "./ui/message-provider";
import { ModalUnregisteredContextProvider } from "./ui/modal-provider";

const queryClient = new QueryClient();


export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ConfigProvider
        getPopupContainer={(node) => node?.parentElement || document.body}
        theme={{
          token: {
            colorLinkActive: "black",
            colorLink: "#fff",
            colorLinkHover: "#60a5fa",
            colorSuccess: 'black'
          },
          components: {
            Modal: {
              contentBg: "#000000",
              titleColor: "#e5e7eb",
              headerBg: "#000000",
              colorIcon: "#e5e7eb",
              colorBgMask: "rgb(91 112 131 / 40%)",
            },
            Layout: {
              bodyBg: 'black',
              headerBg: "transparent",
              footerBg: "transparent",
              footerPadding: "none",
              siderBg: "transparent",
            },
            Button: {
              colorText: "black",
            },
            Input: {
              activeBg: "none",
              activeShadow: "none",
            },
            Message: {
          },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <MessageContextProvider>
            <UserContextProvider>
              <DrawerContextProvider>
                <ModalUnregisteredContextProvider>
                  {children}
                </ModalUnregisteredContextProvider>
              </DrawerContextProvider>
            </UserContextProvider>
          </MessageContextProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}
