"use client";
import { Layout } from "antd";
import { FooterMobile } from "./FooterMobile";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavDesktop from "./NavDesktop";
import MyLoader from "./IU/MyLoader";
import { useUserContext } from "@/context/user-context";
import { usePostsContext } from "@/context/posts-context";
import { useAllUsersContext } from "@/context/all-users-context";
export default function MyContent({ children }: { children: React.ReactNode }) {
  const { getAllPosts } = usePostsContext();
  const { Users } = useAllUsersContext();
  const { loader } = useUserContext();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/') getAllPosts();
    if (pathname === '/users') Users();
  }, [getAllPosts, Users, pathname]);

  const authcontent = ["/login", "/signup"].includes(pathname);

  if (loader) {
    return <MyLoader />;
  }
  return (
    <Layout.Content
      className={`flex flex-col gap-10  ${authcontent && " justify-center "}  `}
    >
      {
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 ">
          {!authcontent && <NavDesktop pathname={pathname} />}
          {!authcontent ? <div className="mb-[100px]">{children}</div> : <>{children}</>}
          {!authcontent && <FooterMobile pathname={pathname} />}
        </div>
      }
    </Layout.Content>
  );
}
