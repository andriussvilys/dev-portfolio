import Signin from "@/src/components/signin/signin";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Page(){
    const session = await getServerSession(authOptions);
    return(
        <Signin signedIn={!!session?.user} />
    )
}