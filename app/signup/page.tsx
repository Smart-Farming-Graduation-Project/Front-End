"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "./signup.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    
  };

  return (
    <div className="signup">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>  
      <div className="form-container relative bg-white p-8 rounded-lg shadow-md w-[400px] m-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-green">Sign Up</h1>
        <p className="mb-4 text-center">Create a new account</p>
        <form onSubmit={handleSignUp}>
          {/* Email Field */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-[20px]" required />
          </div>

          {/* Password Field */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-[20px]" required />
          </div>

          {/* Confirm Password Field */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="py-[20px]" required />
          </div>

          {/* Sign Up Button */}
          <Button type="submit" className="w-full py-[20px] mb-4">
            Sign Up
          </Button>

          {/* Already have an account? Sign In */}
          <div className="text-center">
            <span className="text-sm">Already have an account? </span>
            <Link href="/signin" className="text-sm text-green hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
