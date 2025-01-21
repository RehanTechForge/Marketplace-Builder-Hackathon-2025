"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { getUserById } from "@/sanity/customers/getUserById";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (isLoaded && clerkUser) {
  //       try {
  //         const sanityUser = [] //await getUserById(clerkUser.id);

  //         if (!sanityUser?.isAdmin) {
  //           router.push("/unauthorized");
  //         } else {
  //           setUser(sanityUser);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user from Sanity:", error);
  //         router.push("/unauthorized");
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else if (isLoaded && !clerkUser) {
  //       router.push("/");
  //     }
  //   };

  //   fetchUser();
  // }, [isLoaded, clerkUser, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Prevent rendering until user data is fetched
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <DashboardNav user={user} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardSidebar />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
