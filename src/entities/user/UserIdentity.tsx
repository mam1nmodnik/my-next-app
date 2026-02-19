import {  Popover } from "antd";
import {  signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import IsAvatarUser from "./ui/IsAvatarUser";

type UserIdentityProps = {
  avatar?: string | null;
  name?: string;
  login?: string;
};
export default function UserIdentity({
  avatar,
  name,
  login,
}: UserIdentityProps) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  if (!session) {
    return (
      <Link href='/login'>
        <div className="flex justify-center items-center pt-2.5 pb-2.5  pl-4 pr-4 rounded-[35px] hover:bg-white/10 w-[256px] cursor-pointer ">
          <p className="text-[15px]">Log In to account</p>
        </div>
      </Link>
    );
  }

  return (
    <Popover
      content={
        <div>
          <div
            className="flex flex-row gap-4 items-center cursor-pointer w-full pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 "
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <p className="text-white text-[15px] font-medium">
              Log out @{login}
            </p>
          </div>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      styles={{
        body: {
          width: "256px",
          backgroundColor: "black",
          boxShadow:
            "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
          padding: "15px 0 15px 0",
        },
      }}
      color="black"
    >
      <div className="flex flex-row gap-2 items-center pt-2.5 pb-2.5  pl-4 pr-4 rounded-[35px] hover:bg-white/10 xl:w-[256px] w-[80px] cursor-pointer">
        <IsAvatarUser avatar={avatar} />
        <div className="xl:flex flex-col gap-[0.5px] hidden ">
          {name}
          <p className="text-[#6D6D71] text-[15px]">@{login}</p>
        </div>
      </div>
    </Popover>
  );
}
