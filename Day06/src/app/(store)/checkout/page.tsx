"use client";
import React from "react";
import CheckoutPageClient from "./checkourPageClient";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomSignIn from "@/components/global/SignIn";
const page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  console.log("IS Sign In", isSignedIn, user);

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/sign-in?redirect_url=/checkout");
  //   }
  // }, [isLoaded, isSignedIn, router]);

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  // if (!isSignedIn) {
  //   return <SignIn />;
  // }

  return <CheckoutPageClient />;
};

export default page;
