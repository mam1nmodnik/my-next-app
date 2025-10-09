'use client'
import { MoonLoader } from "react-spinners";

export default function MyLoader() {
  return (
    <div className="flex items-center justify-center bg-gray-500 h-screen ">
      <MoonLoader />
    </div>
  );
}
