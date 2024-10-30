"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Changed from next/router
import Image from "next/image";
import { useEffect } from "react";

const MainDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Don't render content until session is loaded
  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      // Import signOut dynamically to avoid hydration issues
      const { signOut } = await import("next-auth/react");
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {session.user?.name || "User"}!
      </h1>

      {session.user?.image && (
        <div className="mb-6">
          <Image
            src={session.user.image}
            alt={`${session.user.name}'s profile image`}
            width={150}
            height={150}
            className="rounded-full"
            priority
          />
        </div>
      )}

      {session.user?.email && (
        <p className="text-xl mb-8">Email: {session.user.email}</p>
      )}

      <button
        onClick={handleSignOut}
        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MainDashboard;
