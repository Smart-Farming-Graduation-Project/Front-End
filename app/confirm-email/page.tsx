"use client";
import React, { Suspense, useEffect, useState } from "react";
import "../signin/signin.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { confirmEmail, resendConfirmationEmail } from "../utils/api/Auth";

const ConfirmEmailContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const handleConfirmEmail = async () => {
      if (email && token) {
        try {
          const data = await confirmEmail(email, token);
          setMessage(data.message || "Your Email has been successfully confirmed!");
        } catch (apiErrors) {
          console.error("Error confirming email:", apiErrors);
          setError(apiErrors as { message: string });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handleConfirmEmail();
  }, [email, token]);

  const handleResendConfirmationEmail = async () => {
    if (email) {
      try {
        const data = await resendConfirmationEmail(email);
        setMessage(data.message || "Confirmation email has been resent. Please check your inbox.");
        setError(null);
      } catch (apiErrors) {
        console.error("Error resending confirmation email:", apiErrors);
        setError(apiErrors as { message: string });
      }
    }
  };

  return (
    <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md  w-[95%] md:w-[600px]">
      <div className="text-center" aria-live="polite">
        {loading ? (
          <p className="text-green-600">Confirming your email, please wait...</p>
        ) : message ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-green">Congratulations</h1>
            <p className="mb-4 text-green-600">{message}</p>
            <Link href="/signin" className="text-sm text-green hover:underline">
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            {error && <p className="mb-4 text-red-500">{error.message}</p>}
            <Link href="/signin" className="text-sm text-green hover:underline mb-4">
              Back to Sign In
            </Link>
            {error && error.message === "Invalid token. Please try again" && (
              <Button type="submit" className="w-full py-3 sm:py-[20px] mb-4" onClick={handleResendConfirmationEmail}>
                Resend Confirmation Email
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ConfirmEmail = () => {
  return (
    <div className="landing-auth">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
        <ConfirmEmailContent />
      </Suspense>
    </div>
  );
};

export default ConfirmEmail;
