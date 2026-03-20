"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const patams = useParams();
  return <div className="w-full border-r border-r-white/45">{patams.id}</div>;
}
