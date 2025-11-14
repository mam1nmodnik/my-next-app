"use client";

import MyContent from "./MyContent";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <MyContent>{children}</MyContent>;
}
