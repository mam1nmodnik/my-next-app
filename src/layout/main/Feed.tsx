"use client";
export default function Feed({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <main className={`${!active && "max-w-[568px]"} w-full flex flex-col`}>
      <div className="mb-[100px] md:mb-0">
        <div className="w-full flex justify-center h-full min-h-screen">
          <div className="w-full border-r border-r-white/45 border-l border-l-white/45 ">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
