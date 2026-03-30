import GoBack from "@/entities/GoBack";
import FollowSwitcher from "@/widgets/switcher/FollowSwitcher";

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
      <GoBack id={id}/>
      <FollowSwitcher id={id} />
      {children}
    </>
  );
}
