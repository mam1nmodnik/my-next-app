"use client";
import { useUserContext } from "@/_providers/infra/user-provider";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function GoBack({ id }: { id: string }) {
  const {dataUser} = useUserContext()
  return (
    <div className="w-full h-[50px] flex items-center justify-start  ml-2">
      <Link href={dataUser?.id == Number(id) ? "/profile" : "/user/" + id} className="flex items-center gap-2">
        <div className=" p-1 hover:bg-white/15 rounded-[50%] ">
          <IoIosArrowBack size={28} className="text-white cursor-pointer" />
        </div>
      </Link>
    </div>
  );
}
