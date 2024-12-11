"use client";
import { useMobileContext } from "@/app/utils/contexts/MobileHandler";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import BorderButton from "../utils/BorderButton";
import { FaArrowRightLong } from "react-icons/fa6";

const Navbar = () => {
  type Link = {
    name: string;
    url: string;
  };
  const links: Link[] = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: "Community", url: "/community" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobileContext();

  return (
    // i recommend to make menu in middle and (icon, sign in / photo) right
    <div className="flex md:items-center md:flex-1">
      {/* Mobile */}
      {isMobile && (
        <div className="flex items-center justify-between w-full">
          {isOpen && (
            <div className="flex flex-col absolute top-[100%] bg-black/80 rounded-xl left-0 pb-5 gap-3 items-center w-full">
              <nav>
                <ul className="flex flex-col items-center gap-2 text-lg text-white">
                  {links.map((link, index) => (
                    <li key={index} onClick={() => setIsOpen(false)} className="py-2 cursor-pointer hover:text-white/80 hover:pl-3 transition-all duration-300">
                      <Link href={link.url}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* start user & sign in */}
              <div className="flex items-center justify-center gap-3">
                <button
                  className="w-fit px-[20px] group text-[14px] whitespace-nowrap font-normal text-white flex gap-2 items-center rounded-full border border-white bg-white/0 hover:bg-white/10 hover:transition-all hover:duration-300"
                  style={{ height: "35px" }}>
                  <Link href="/sign-in">Sign In</Link>
                </button>
              </div>
              {/* end user & sign in */}
            </div>
          )}

          <div className="text-white text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoCloseSharp /> : <IoIosMenu />}
          </div>
        </div>
      )}
      {/* Desktop */}
      <div className="flex flex-1 items-center justify-between">
        <nav className="hidden md:flex w-full h-full flex-1 items-center justify-center leading-[17px] font-normal">
          <ul className="w-full h-full flex items-center justify-center gap-4 text-[14px]">
            {links.map((link, index) => (
              <li
                key={index}
                className="py-3 text-white/80 whitespace-nowrap cursor-pointer relative after:content-[''] after:absolute after:bottom-[11px] after:right-0 hover:after:left-0 after:h-[1px] after:bg-white after:max-w-96 after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-white">
                <Link href={link.url} className="text-[15px]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* start user & sign in */}
        <div className="hidden md:flex items-center justify-end gap-3">
          <BorderButton>
            <Link href="/signin">Sign In</Link>
            <FaArrowRightLong />
          </BorderButton>
        </div>
        {/* end user & sign in */}
      </div>
    </div>
  );
};

export default Navbar;
