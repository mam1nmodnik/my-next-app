"use client";

import { Layout } from "antd";
import { FooterMobile } from "./FooterMobile";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AppProvider from "@/app/_providers/app-provider";
import NavDesktop from "./NavDesktop";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  const authcontent = ["/login", "/signup"].includes(pathname);

  return (
    <AppProvider>
      <Layout >
        <Layout>
          <Layout.Content
            className={`flex flex-col gap-10  ${
              authcontent && " justify-center "
            }  `}
          >
            {
              <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 bg-fixed">
                <NavDesktop pathname={pathname}/>
                {children}
                {!authcontent && <FooterMobile pathname={pathname} />}
              </div>
            }
          </Layout.Content>
        </Layout>
      </Layout>
    </AppProvider>
  );
}
