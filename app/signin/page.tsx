"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "./signin.css";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { loginUser } from "../utils/api/Auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
// import FacebookSignButton from "../components/Auth/FacebookSignButton";
import GoogleSignButton from "../components/Auth/GoogleSignButton";
import { useAuth } from "../utils/contexts/AuthContext";
import { FaFacebook } from "react-icons/fa6";
// import FacebookSignButton from "../components/Auth/FacebookSign";
export default function SignIn() {
  const { user, login } = useAuth();
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string | null } | null>(null);
  const router = useRouter();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser({
        userNameOrEmail,
        password,
      });
      // Navigate to home/dashboard based on the token received
      // console.log("Login Successful:", data.data.tokens.accessToken);
      if (data.statusCode == 200) {
        Cookies.set("token", data.data.tokens.accessToken);
        if (user?.Role === "Admin") router.push("/dashboard");
        else router.push("/");
        login(data.data.tokens.accessToken);
      }
    } catch (apiErrors) {
      console.error("Registration Failed:", apiErrors);
      setError(apiErrors as { message: string });
    }
  };

  return (
    <div className="landing-auth">
      <div className="relative mb-4 text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-sm sm:text-base md:text-lg">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[95%] md:w-[600px]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green">Sign In</h1>
        <p className="mb-4 text-center text-sm sm:text-base text-gray-600">Enter your email to login your account</p>
        {error && error.message?.trim() !== "" && <p className="text-sm text-red-500 mb-4 text-center bg-[#ff232325] py-2 rounded-md">{error.message}</p>}

        <form onSubmit={handleSignIn}>
          {/* Email Field */}
          <div className="grid items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <IoMdMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
              <Input type="email" id="email" placeholder="Email" value={userNameOrEmail} onChange={(e) => setUserNameOrEmail(e.target.value)} className="pl-8 py-[20px]" required />
            </div>
          </div>

          {/* Password Field */}
          <div className="grid items-center gap-1.5 mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
              <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-8 py-[20px]" required />
            </div>
          </div>

          {/* Sign In Button */}
          <Button type="submit" className="w-full py-3 sm:py-[20px] mb-4">
            Sign In
          </Button>
        </form>

        {/* Divider with "or" */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-[#ccc]"></div>
          <span className="text-sm text-green">OR With</span>
          <div className="flex-1 h-px bg-[#ccc]"></div>
        </div>

        {/* Third-Party Sign In Buttons */}
        <div className="flex flex-col gap-2 mb-4">
          <GoogleSignButton typePage="signin" />
          {/* <FacebookSignButton typePage="signin" /> */}
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]">
            <FaFacebook className="text-blue-600" size={20} />
            <span>Sign in with Facebook</span>
          </Button>
        </div>

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
      </div>
    </div>
  );
}
