"use client";
import React from "react";
import "./Landing.css";
import { Button } from "@/components/ui/button";
import BorderButton from "../utils/BorderButton";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { useAuth } from "@/app/utils/contexts/AuthContext";
const Landing = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="landing h-screen flex items-center justify-center flex-col">
      <div className="relative text-center text-white max-w-full w-[800px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-[40px] font-semibold text-white sm:text-6xl mb-5">Welcome to CropGuard</h1>
        <p className="text-white/80 text-base sm:text-lg">Your gateway to fresh, local produce and smart farming solutions.</p>
      </div>
      {!user && !isLoading && (
        <div className="relative mt-5 flex items-center gap-6 flex-col sm:flex-row">
          <Button className="font-normal text-xl py-6 px-6">
            <Link href="/signin">Join Now</Link>
          </Button>
          <Link href="/">
            <BorderButton>
              Join Our Community
              <FaArrowRightLong className="animate-bounce" />
            </BorderButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Landing;
