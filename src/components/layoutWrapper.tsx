"use client";

import { Layout } from "antd";
import MyContent from "./MyContent";
import AppProvider from "@/app/_providers/app-provider";


export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Layout >
        <Layout>
          <MyContent>
            {children}
          </MyContent>
        </Layout>
      </Layout>
    </AppProvider>
  );
}
