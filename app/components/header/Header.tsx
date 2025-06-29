"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Header.css";
import Logo from "../../assets/images/Logo.png";
import Navbar from "./Navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/redux/store/store";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isOpenRounded, setIsOpenRounded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const cartCount = useSelector((state: RootState) => state.carts.cartCount);
  const wishlistCount = useSelector((state: RootState) => state.wishList.wishlistCount);

  // Check if user is admin
  const isAdmin = user?.Role && Array.isArray(user.Role) && user.Role.includes("Admin");

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
    <header className={` fixed py-[8px] z-40 rounded-xl  ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"} ${isOpenRounded ? "rounded-bl-none rounded-br-none" : ""}`}>
      <div className="container gap-4 flex items-center justify-between">
        {/* start logo */}
        <div className="h-full flex-shrink-0 flex items-center">
          <Link href="/">
            <Image src={Logo} alt="Crop Guard Logo" width={120} height={60} style={{ width: "auto", height: "auto" }} priority />
          </Link>
        </div>
        {/* end logo */}

        <Navbar setIsOpenRounded={setIsOpenRounded} />
      </div>
    </header>
  );
};

export default Header;
