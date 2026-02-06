import WhoToFollow from "../features/follow/WhoToFollow";

export default function AsideRight() {
  return (
    <div className="text-white w-fit lg:block hidden  ">
      <div className="sticky top-0">
        <div className="flex flex-col gap-4 mt-5 p-4 ">
          <div className="border border-white/30 rounded-2xl h-[300px] w-[350px] p-4 ">
            <h1 className="text-xl font-bold ">Trends for you</h1>
          </div>
        </div>
        <WhoToFollow />
      </div>
    </div>
  );
}
