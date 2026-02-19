"use client";
import { UserContextProvider } from "@/app/_providers/infra/user-provider";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { MessageContextProvider } from "@/app/_providers/ui/message-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrawerContextProvider } from "@/app/_providers/ui/drawer-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalUnregisteredContextProvider } from "@/app/_providers/ui/modal-provider";

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
