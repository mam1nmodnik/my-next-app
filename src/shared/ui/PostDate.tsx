"use client";
import { formateDate } from "@/lib/help";

export default function PostDate({ date }: { date: Date }) {
  const updateDate = formateDate(date);
  return (
    <p className=" md:text-[14px] text-[0.8rem] text-right text-[#9CA3AF] ">
      {updateDate}
    </p>
  );
}
