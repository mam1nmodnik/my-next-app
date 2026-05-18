"use client";
import { Divider } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FollowSwitcher({ id }: { id: string }) {
  const pathname = usePathname();

  const LINK = [
    {
      name: "followers",
      href: `/follow/${id}/followers`,
    },
    {
      name: "following",
      href: `/follow/${id}/following`,
    },
  ];

  return (
    <>
      <div className="flex justify-evenly flex-row h-[50px] bg-black w-full">
        {LINK.map((link) => (
          <Link href={link.href} key={link.href} className="w-full">
            <div className=" w-full text-center h-full flex items-center justify-center  cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative">
              <div className="w-full relative">
                <p
                  className={
                    pathname === link.href ? "text-white" : `text-white/55`
                  }
                >
                  {link.name}
                </p>
                {pathname === link.href && (
                  <div className=" absolute w-[40%] h-[4px] rounded-2xl bg-blue-500 left-[30%]"></div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Divider
        size="small"
        className="border border-white/35"
        style={{ margin: 0 }}
      />
    </>
  );
}
