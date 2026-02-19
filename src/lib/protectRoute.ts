import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function protectRoute(link: string, requireAuth: boolean ) {
    const session = await getServerSession(authOptions);

    if(requireAuth && !session){
        return redirect(link);
    }
 
    if(!requireAuth && session){
        return redirect(link);
    }
}