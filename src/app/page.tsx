import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";
import Home from "../components/home/home";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <Home signedIn={!!session?.user}/>
  );
}
