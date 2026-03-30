import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

export default async function Layout() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center p-8">
          <div className="p-4 bg-white/20 rounded-[50%] w-fit ">
            <HiOutlineChatBubbleOvalLeft size={56} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[24px]">В разработке</h1>
            <p className="text-white/35 max-w-[360px]">
              Эта страница находится в разработке. Пожалуйста, вернитесь позже.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-row">
  //     <div className="max-w-[420px] h-screen w-full border-r border-r-white/45 ">
  //       <ChatSwitcher />
  //     </div>
  //     {children}
  //   </div>
  // );
}
