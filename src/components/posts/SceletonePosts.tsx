import { Skeleton } from "antd";

export default function SceletonePosts(){
    return (
        <div className="p-4 flex justify-center items-center   w-full gap-4 md:mt-0 mt-5">
        <div className="w-[80%]">
          <Skeleton active />
        </div>
      </div>
    )
}