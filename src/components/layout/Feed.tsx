
export default function Feed({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-[568px] flex flex-col">
      <div className="mb-[100px] md:mb-0">{children}</div>
    </main>
  );
}
