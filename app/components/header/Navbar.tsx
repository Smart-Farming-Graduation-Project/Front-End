"use client";
import { useMobileContext } from "@/app/utils/contexts/MobileHandler";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import BorderButton from "../utils/BorderButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/app/utils/types/app";
import "./Navbar.css";
import { RootState } from "../../utils/redux/store/store";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProfileDropdown from "../dashboard/ProfileDropdown";

const Navbar = ({ setIsOpenRounded }: { setIsOpenRounded: (isOpen: boolean) => void }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts.carts);
  const wishList = useSelector((state: RootState) => state.wishList.wishList);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  // Check if user is admin
  const isAdmin = user?.Role && Array.isArray(user.Role) && user.Role.includes("Admin");

  type Link = {
    name: string;
    url: string;
  };
  const links: Link[] = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobileContext();

  return (
    <div className="flex md:items-center md:flex-1">
      {/* Mobile */}
      {isMobile && (
        <div className="flex items-center justify-between w-full">
          {/* Mobile menu overlay */}
          {isOpen && (
            <div className="flex flex-col absolute top-[100%] bg-black/80 rounded-bl-xl rounded-br-xl left-0 pb-5 gap-3 items-center w-full">
              {/* Admin Panel Button for Mobile */}
              {isAdmin && (
                <div className="w-full px-4 pt-4">
                  <button
                    onClick={() => {
                      router.push("/dashboard/admin");
                      setIsOpen(false);
                      setIsOpenRounded(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Admin Panel</span>
                  </button>
                </div>
              )}

              <nav>
                <ul className="flex flex-col gap-4 px-4">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        className="text-white text-[14px] font-normal transition-all duration-300 hover:text-green-400"
                        href={link.url}
                        onClick={() => {
                          setIsOpen(false);
                          setIsOpenRounded(false);
                        }}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* start nav icon */}
              <div className="nav-icons flex gap-3">
                <Link href="/wishlist">
                  <FaHeart />
                  <span>{wishList.length}</span>
                </Link>
                <Link href="/cart">
                  <HiOutlineShoppingCart />
                  <span>{carts.length}</span>
                </Link>
              </div>
              {/* end nav icon */}
            </div>
          )}

          {/* Mobile Header Controls */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown - Outside of menu for mobile */}
            {!isLoading && user && (
              <div className="md:hidden">
                <ProfileDropdown />
              </div>
            )}

            {/* Hamburger Menu Button */}
            <div
              className="text-white text-3xl cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenRounded(!isOpen);
              }}>
              {isOpen ? <IoCloseSharp /> : <IoIosMenu />}
            </div>
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

        {/* Desktop Navigation Icons and User */}
        <div className="nav-icons hidden md:flex items-center justify-end gap-2">
          <Link href="/wishlist">
            <span>{wishList.length ? wishList.length : 0}</span>
            <FaHeart />
          </Link>
          <Link href="/cart">
            <span>{carts.length ? carts.length : 0}</span>
            <HiOutlineShoppingCart />
          </Link>

          {!isLoading && (
            <>
              {user ? (
                <ProfileDropdown />
              ) : (
                <BorderButton>
                  <Link href="/signin">Sign In</Link>
                  <FaArrowRightLong />
                </BorderButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
