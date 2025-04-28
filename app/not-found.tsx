"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import logo from "./assets/images/Logo3.png";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#033d20] to-green p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              width={80}
              height={30}
              alt="CropGuard"
              className="object-contain"
              onError={(e) => {
                e.currentTarget.src = "/favicon.ico";
              }}
            />
          </div>

          <div className="text-center">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green to-emerald-600 mb-2">
              404
            </motion.h1>

            <h2 className="text-2xl font-bold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2 py-2 px-4 w-full sm:w-auto">
                <ArrowLeft size={16} />
                <span>Go Back</span>
              </Button>

              <Button asChild className="flex items-center gap-2 py-2 px-4 w-full sm:w-auto">
                <Link href="/">
                  <Home size={16} />
                  <span>Home Page</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Looking for something specific? Try visiting our
            <Link href="/shop" className="text-green hover:underline mx-1">
              shop
            </Link>
            or
            <Link href="/contact" className="text-green hover:underline mx-1">
              contact us
            </Link>
            for help.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
