import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts"


export default async function Dashboard(
  authOptions : AuthOptions
) {

const session = await getServerSession(authOptions)
if(!session){
    redirect ("/api/auth/signin")
}

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session.user?.name}</h1>
      <MyPosts />
    </main>
  );
}
