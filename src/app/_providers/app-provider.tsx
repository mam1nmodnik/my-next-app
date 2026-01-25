"use client";
import { UserContextProvider } from "@/context/user-context";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { MessageContextProvider } from "@/context/message-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrawerContextProvider } from "@/context/drawer-context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalUnregisteredContextProvider } from "@/context/modal-unregistered";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ModalUnregisteredContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <MessageContextProvider>
          <UserContextProvider>
            <DrawerContextProvider>
              <ConfigProvider
                getPopupContainer={(node) =>
                  node?.parentElement || document.body
                }
                theme={{
                  token: {
                    colorLinkActive: "black",
                    colorLink: "#fff",
                    colorLinkHover: "#60a5fa",
                  },
                  components: {
                    Modal: {
                      contentBg: "ghosthub-card",
                      titleColor: "#E2E8F0",
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
                    Input: {
                      activeBg: "none",
                    },
                  },
                }}
              >
                {children}
              </ConfigProvider>
            </DrawerContextProvider>
          </UserContextProvider>
        </MessageContextProvider>
      </QueryClientProvider>
      </ModalUnregisteredContextProvider>
    </SessionProvider>
  );
}
