"use client";

import UserInfo from "@/components/login/UserInfo";
// import Image from "next/image";
import LoginPage from "./login/page";
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "./Navbar/page";

export default function Home() {
    const { data: session, status } = useSession();
    console.log(session);

    return (
        <SessionProvider>
            <div>
                <Navbar></Navbar>
                {/* <LoginPage /> */}
                Main page
            </div>
        </SessionProvider>
    );
}
