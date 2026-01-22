import { Skeleton } from "antd";
type SceletoneType = {
  count: number;
}

export default function SceletonePosts({ count }: SceletoneType) {
  const scelete =
    <div className="flex flex-col max-w-full gap-4 md:mt-0">
      <div className="flex flex-col items-center w-full gap-4 h-fit  ">
        <div className="flex flex-col justify-between gap-4 font-sans md:pt-8 md:pr-8 md:pl-8 md:pb-4 p-4  min-h-fit md:max-w-[968px] w-full   border border-slate-700 rounded-2xl shadow-indigo-900/20">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-center">
              {
                <Skeleton avatar paragraph={{ rows: 3 }} /> 
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  const content = Array.from({ length: count }, (_, i) => (
    <div key={i}>{scelete}</div>
  ));

  return (
    <>
      {content}
    </>
  )
}