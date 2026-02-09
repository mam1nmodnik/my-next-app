import WhoToFollow from "../features/follow/WhoToFollow";

export default function AsideRight() {
  return (
      <div className="lg:flex hidden flex-col justify-between gap-2 max-w-[260px] w-full mt-5 relative">
      <div className="fixed top-0">
        <div className="flex flex-col gap-4 mt-5 p-4 ">
          <div className="border border-white/30 rounded-2xl h-[300px] w-full p-4 ">
            <h1 className="text-xl font-bold ">Trends for you</h1>
          </div>
        </div>
        <WhoToFollow />
      </div>
    </div>
  );
}
