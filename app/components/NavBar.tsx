import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

const NavBar = async () => {

  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={144} height={30} className="cursor-pointer" alt="logo" />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={ async () => {
                "use server"
                await signIn('github')
              }}
            >
              <span>Login</span>
            </button>

            // using form extension from NextJs but the button seems to work as well now
            // <form
            //   action={async () => {
            //   "use server";
            //
            //   await signIn("github");
            // }}>
            //   <button type="submit">Login</button>
            // </form>
          )}
        </div>
      </nav>
    </header>
  )
}
export default NavBar
