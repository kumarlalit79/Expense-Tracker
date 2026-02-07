"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("session status", status);
    console.log("session data", session);
    console.log("User data", session?.user);
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut({callbackUrl:"/auth"})
  }

  return (
    <div>
      Welcome {session?.user.name} to dashboard
      <Button variant="outline" onClick={handleSignOut}>
        Logout
      </Button>
      
    </div>
  );
};

export default page;
