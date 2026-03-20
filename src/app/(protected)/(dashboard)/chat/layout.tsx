import ChatSwitcher from "@/widgets/ChatSwitcher/ChatSwitcher";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <div className="max-w-[420px] h-screen w-full border-r border-r-white/45 border-l border-l-white/45">
        <ChatSwitcher />
      </div>
      {children}
    </div>
  );
}
