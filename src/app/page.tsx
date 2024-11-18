"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "./Navbar/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || !session) router.push("/login");
    if (session && session.user) router.push("/dashboard");
  }, [status, router, session]);

  if (!session) return <>Loading</>;

  return (
    <SessionProvider>
      <div>
        <Navbar></Navbar>
      </div>
    </SessionProvider>
  );
}
