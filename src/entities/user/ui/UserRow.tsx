"use client";
import { ReactElement } from "react";
import UserCard from "./UserCard";

export default function UserRow({
  avatar,
  name,
  login,
  compact,
  rightSlot,
  id,
  classText,
  classBlockSize,
  link,
}: {
  avatar?: string | null;
  name?: string | null;
  login?: string | null;
  compact?: boolean;
  rightSlot?: ReactElement;
  id?: number;
  classText?: string;
  classBlockSize?: string;
  link?: boolean;
}) {
  return (
    <div
      className={`flex flex-row gap-2 justify-between items-center pt-2.5 pb-2.5 pl-4 pr-4 rounded-[35px] hover:bg-white/10 ${compact ? " w-[80px] " : `xl:w-full ${classBlockSize} `} cursor-pointer`}
    >
      <UserCard
        avatar={avatar}
        name={name}
        login={login}
        isChat={compact}
        link={link}
        id={id}
        className={classText}
      />
      {rightSlot}
    </div>
  );
}
