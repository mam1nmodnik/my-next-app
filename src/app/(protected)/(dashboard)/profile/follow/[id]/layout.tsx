import FollowSwitcher from "@/widgets/FollowSwitcher/FollowSwitcher";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <FollowSwitcher id={id} />
      {children}
    </>
  );
}
