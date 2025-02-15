"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "../signin/signin.css";
import { IoMdMail } from "react-icons/io";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Email sent to: ${email}`);
    setEmailSent(true);
  };

  return (
    <div className="landing-auth">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[90%] sm:w-[80%] md:w-[400px]">
        <h1 className="text-3xl font-bold mb-4 text-center text-green">Forgot Password</h1>
        {emailSent ? (
          <div className="text-center">
            <p className="mb-4 text-green-600">
              An email has been sent to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Link href="/signin" className="text-sm text-green hover:underline">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-center">Enter your email to reset your password</p>
            <form onSubmit={handleForgotPassword}>
              {/* Email Field */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <IoMdMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>

              {/* Reset Password Button */}
              <Button type="submit" className="w-full py-[20px] mb-4">
                Reset Password
              </Button>

              {/* Back to Sign In Link */}
              <div className="text-center">
                <span className="text-sm">Remember your password? </span>
                <Link href="/signin" className="text-sm text-green hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
