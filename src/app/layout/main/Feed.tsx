export default function Feed({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <main className={` ${!active && "max-w-[568px]"} w-full flex flex-col`}>
      <div className="mb-[100px] md:mb-0" >{children}</div>
    </main>
  );
}
