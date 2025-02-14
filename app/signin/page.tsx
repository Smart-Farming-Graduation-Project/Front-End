"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "./signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="signin">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-8 rounded-lg shadow-md w-[400px] m-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-green">Sign In</h1>
        <p className="mb-4 text-center">Enter your email to login your account</p>
        <form onSubmit={handleSignIn}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-[20px]" required />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-[20px]" required />
          </div>
          <Button type="submit" className="w-full py-[20px] mb-4">
            Sign In
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center mb-2">
            <Link href="/forgot-password" className="text-sm text-green hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Do you have an account? Sign Up */}
          <div className="text-center">
            <span className="text-sm">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-sm text-green hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
