import Link from "next/link";
import Login from "./login";
import Logged from "./Logged";
import {getServerSession} from 'next-auth/next'
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Nav() {

    const session = await getServerSession(authOptions)
    console.log(session)

    return(
  <nav className="flex justify-between item-center py-8">
    <Link href="/">
      <h1 className="font-bold text-lg">Sent it.</h1>
    </Link>
    <ul className="fle items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || "" } />}
        
    </ul>
  </nav>
    )
}
