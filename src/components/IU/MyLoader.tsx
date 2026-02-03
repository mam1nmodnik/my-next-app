"use client";
import { JSX } from "react";
import { LoadingOutlined } from '@ant-design/icons';

type MyLoaderProps = {
  size?: number;
  color?: string;
};

export default function MyLoader({ size, color }: MyLoaderProps): JSX.Element {
  return (
    <div className="flex justify-center items-center bg-black ">
      <LoadingOutlined style={{ color: color || "white", fontSize: size || 32 }} />
    </div>
  );
}
