'use client'
import { Layout } from "antd";
import { FooterMobile } from "./FooterMobile";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavDesktop from "./NavDesktop";
import { usePostsContext } from "@/context/posts-context";
import MyLoader from "./IU/MyLoader";
export default function MyContent({ children }: { children: React.ReactNode }) {
  const { loader } = usePostsContext();
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  const authcontent = ["/login", "/signup"].includes(pathname);
  if (!loader) {
    return <MyLoader />
  }
  return (
    <Layout.Content
      className={`flex flex-col gap-10  ${authcontent && " justify-center "}  `}
    >
      {
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 bg-fixed">
          <NavDesktop pathname={pathname} />
          {children}
          {!authcontent && <FooterMobile pathname={pathname} />}
        </div>
      }
    </Layout.Content>
  );
}
