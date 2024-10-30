"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import GoogleBtn from "./GoogleBtn";

const UserInfo: React.FC = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated" && session?.user?.image) {
    return (
      <div>
        <Image
          src={session.user.image}
          width={60}
          height={60}
          alt="User Image"
        />
        <div>
          <h3>Name: {session.user.name}</h3>
        </div>
        <div>
          <h3>Email:{session.user.email}</h3>
        </div>
      </div>
    );
  } else {
    <GoogleBtn></GoogleBtn>;
  }

  return;
  <>Not Authenticated</>;
};

export default UserInfo;
