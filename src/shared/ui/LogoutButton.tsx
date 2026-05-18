import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleClick = async () => {

    try {

      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return console.error("Logout failed", data);
      } else {

        console.log("Logout success", data);

        return await signOut({ callbackUrl: "/login" });
      }
    } catch (error) {
      console.error("Logout request error", error);
    }
  };

  return (
    <button
      className="block rounded-[20px] h-[40px] pr-2 pl-2 text-white hover:bg-white/25 hover:text-blue-400 cursor-pointer"
      onClick={handleClick}
    >
      Выйти
    </button>
  );
}
