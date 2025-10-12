"use client";

import { Layout } from "antd";
import MyContent from "./MyContent";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
        <Layout>
          <Layout>
            <MyContent>{children}</MyContent>
          </Layout>
        </Layout>
  );
}
