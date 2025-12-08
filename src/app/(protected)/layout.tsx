import UserSessionPage from "@/context/user-session";
import "../globals.css";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserSessionPage>{children}</UserSessionPage>;
}
