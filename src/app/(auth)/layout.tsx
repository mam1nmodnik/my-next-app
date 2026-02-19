import "../globals.css";
import { protectRoute } from "@/lib/protectRoute";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await protectRoute("/", false);

  return <>{children}</>;
}
