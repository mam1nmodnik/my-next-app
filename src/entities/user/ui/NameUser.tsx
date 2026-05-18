"use client";

export default function NameUser({
  name,
  login,
}: {
  name?: string | null;
  login?: string | null;
}) {
  return (
    <div className="flex flex-col gap-[0.5px]">
      <span className="truncate text-[15px] font-bold">{name}</span>
      <span className="text-[#6D6D71] text-[15px] truncate">@{login}</span>
    </div>
  );
}
