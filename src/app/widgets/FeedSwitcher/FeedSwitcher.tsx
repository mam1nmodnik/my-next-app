import { Dispatch, SetStateAction } from "react";

export default function FeedSwitcher({toggle, setToggle}: { toggle: boolean, setToggle:  Dispatch<SetStateAction<boolean>>}) {
  return (
    <div className="flex flex-row h-[50px] bg-black">
      <div
        onClick={() => setToggle(() => true)}
        className="max-w-[284px] h-full flex items-center justify-center w-full  cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative"
      >
        <div className="w-fit">
          <p className={toggle ? "text-white" : `text-white/55`}>Popular</p>
          {toggle && (
            <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
          )}
        </div>
      </div>
      <div
        onClick={() => setToggle(() => false)}
        className="max-w-[284px] w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative"
      >
        <div className="w-fit">
          <p className={!toggle ? "text-white" : `text-white/55`}>Follow</p>
          {!toggle && (
            <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
          )}
        </div>
      </div>
    </div>
  );
}
