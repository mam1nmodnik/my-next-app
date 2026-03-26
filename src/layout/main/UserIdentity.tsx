import { Popover } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import UserRow from "@/entities/user/ui/UserRow";

type UserIdentityProps = {
  avatar?: string | null;
  name?: string;
  login?: string;
  isChat: boolean;
  id?: number;
};

export default function UserIdentity({
  avatar,
  name,
  login,
  isChat,
  id,
}: UserIdentityProps) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  if (!session) {
    return (
      <div className="w-full">
        <Link href="/login">
          <div className="text-center xl:pt-2.5 xl:pb-2.5  pt-1.5 pb-1.5  xl:pl-4 xl:pr-4 pl-2.5 pr-2.5  rounded-[35px] hover:bg-white/10 xl:w-[256px] w-fit cursor-pointer ">
            <p className="text-[18px] xl:block hidden">Log In to account</p>
            <p className="text-[18px] block xl:hidden">Log In</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="  w-full ">
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
        <div>
          <UserRow
            avatar={avatar}
            name={name}
            login={login}
            compact={isChat}
            id={id}
            classText="xl:block hidden"
            classBlockSize="w-fit"
            link={false}
          />
        </div>
      </Popover>
    </div>
  );
}
