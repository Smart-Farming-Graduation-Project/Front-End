"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "../signin/signin.css";
import { IoIosLock } from "react-icons/io";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("Password reset successfully!");
      setIsPasswordReset(true);
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="landing-auth">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[90%] sm:w-[80%] md:w-[400px]">
        <h1 className="text-3xl font-bold mb-4 text-center text-green">Reset Password</h1>
        {isPasswordReset ? (
          <div className="text-center">
            <p className="mb-4 text-green-600">Password has reseted successfully!</p>
            <Link href="/signin">
              <Button className="w-full py-[20px] bg-green hover:bg-green-700">Go to Login</Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-center text-gray">Enter your new password</p>
            <form onSubmit={handleResetPassword}>
              {/* New Password Field */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>
              {/* Confirm Password Field */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-7 py-[20px]" required />
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
