"use client";

import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function FacebookSignButton({ typePage }: { typePage: string }) {
  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={handleFacebookLogin}>
      <FaFacebook className="text-blue-600" size={20} />
      <span>{typePage === "signin" ? "Sign in" : "Sign up"} with Facebook</span>
    </Button>
  );
}
