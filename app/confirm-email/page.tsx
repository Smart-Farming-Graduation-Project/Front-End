"use client";
import React from "react";
import "../signin/signin.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { confirmEmail } from "../utils/api/Auth";

const ConfirmEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [message, setMessage] = useState(false);
  console.log(email, token);

  useEffect(() => {
    const handleConfirmEmail = async () => {
      if (email && token) {
        try {
          await confirmEmail(email as string, token as string);
          setMessage(true);
        } catch {
          setMessage(false);
        }
      }
    };

    handleConfirmEmail();
  }, [email, token]);

  return (
    <div className="landing-auth">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[90%] sm:w-[80%] md:w-[600px]">
        <div className="text-center">
          {message ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center text-green">Congratulations</h1>
              <p className="mb-4 text-green-600">Your Email has been successfully confirmed!</p>
              <Link href="/signin" className="text-sm text-green hover:underline">
                Back to Sign In
              </Link>
            </>
          ) : (
            <>
              <p className="mb-4 text-green-600">Failed to confirm email. Please try again.</p>
              <Button type="submit" className="w-full py-3 sm:py-[20px] mb-4" onClick={() => confirmEmail(email as string, token as string)}>
                Resend Confirmation Email
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
