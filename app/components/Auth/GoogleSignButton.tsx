"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignButton({ typePage }: { typePage: string }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    signIn("google", {
      callbackUrl: typePage === "signin" ? "/" : "/signin",
      redirect: true,
    });
  };

  return (
    <Button variant="outline" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={handleGoogleLogin}>
      <FcGoogle size={20} />
      <span>{loading ? "Redirecting..." : `${typePage === "signin" ? "Sign in" : "Sign up"} with Google`}</span>
    </Button>
  );
}
