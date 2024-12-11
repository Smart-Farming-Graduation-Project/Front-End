"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Header.css";
import Logo from "../../assets/images/Logo.png";
import Navbar from "./Navbar";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={` fixed py-[8px] z-40 transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="container gap-4 flex items-center justify-between">
        {/* start logo */}
        <div className="h-full flex-shrink-0 flex items-center">
          <Link href="/">
            <Image src={Logo} alt="logo" className="object-cover" width={130} height={56} />
          </Link>
        </div>
        {/* end logo */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
