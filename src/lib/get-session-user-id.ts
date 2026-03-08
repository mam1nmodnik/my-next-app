import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export async function getSessionUserId(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  const rawId = session?.user?.id;

  if (!rawId) {
    return null;
  }
  
  const userId = Number(rawId);
  if (!Number.isInteger(userId) || userId <= 0) {
    return null;
  }

  return userId;
}
