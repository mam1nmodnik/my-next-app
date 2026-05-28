import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
 type NextAuthTokenWithAccess = {
  accessToken?: string;
  refreshToken?: string;
};
export async function getTokenFromRequest  (request: NextRequest) : Promise<NextAuthTokenWithAccess | null> { 
     const token = (await getToken({
          req: request ,
          secret: process.env.NEXTAUTH_SECRET,
        })) as NextAuthTokenWithAccess | null;
    return token;
}
