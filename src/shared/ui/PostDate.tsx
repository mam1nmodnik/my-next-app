"use client";
import { formateDate } from "@/lib/help";

export default function PostDate({ date }: { date: Date }) {
  const updateDate = formateDate(date);
  return <>{updateDate}</>;
}
