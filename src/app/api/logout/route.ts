import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { apiError } from "@/shared/api/server";
import { getTokenFromRequest } from "@/shared/config/token";




export async function POST(request: NextRequest) {
  const userId = await getSessionUserId()
  if (!userId) {
      return apiError("Не авторизован", { status: 401, notice: "warning" });
  }
  const token = await getTokenFromRequest(request);
  
  try {
    const accessToken = token?.accessToken;
    const refreshToken = token?.refreshToken;
    
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/auth/logout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ 
        id: userId,
        refreshToken
      }),
    });

    let data: unknown = null;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: "Backend logout failed", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data ?? { message: "Logged out" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Logout proxy failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
