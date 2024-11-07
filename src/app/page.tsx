"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "./Navbar/page";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <SessionProvider>
      <div>
        <Navbar></Navbar>
        Main page
      </div>
    </SessionProvider>
  );
}
