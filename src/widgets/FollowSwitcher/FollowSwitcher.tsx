"use client";
import { Divider } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FollowSwitcher({ id }: { id: string }) {
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-evenly flex-row h-[50px] bg-black">
        <Link href={`/profile/follow/${id}/followers`}>
          <div className="max-w-[284px] h-full flex items-center justify-center w-full  cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative">
            <div className="w-fit">
              <p
                className={
                  pathname === `/profile/follow/${id}/followers`
                    ? "text-white"
                    : `text-white/55`
                }
              >
                Folowers
              </p>
              {pathname == `/profile/follow/${id}/followers` && (
                <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
              )}
            </div>
          </div>
        </Link>
        <Link href={`/profile/follow/${id}/following`}>
          <div className="max-w-[284px] w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative">
            <div className="w-fit">
              <p
                className={
                  pathname === `/profile/follow/${id}/following`
                    ? "text-white"
                    : `text-white/55`
                }
              >
                Folowing
              </p>
              {pathname === `/profile/follow/${id}/following` && (
                <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
              )}
            </div>
          </div>
        </Link>
      </div>
      <Divider
        size="small"
        className="border border-white/35"
        style={{ margin: 0 }}
      />
    </>
  );
}
