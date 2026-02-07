"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
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

  return (
    <div>
      Welcome to dashboard
      <Button variant="outline" onClick={() => router.push("/auth")}>
        Button
      </Button>
    </div>
  );
};

export default page;
