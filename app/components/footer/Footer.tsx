import React from "react";
import "./Footer.css";
import Image from "next/image";
import logo from "../../assets/images/Logo.png";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { MdCall, MdEmail } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";

const Footer = () => {
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

  return (
    <footer className="bg-[#24231D] py-10">
      <div className="container">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 text-white/60 ">
          <div className="foot col-span-3 md:col-span-1">
            <Image src={logo} alt="cropPilot" width={140} className={`mx-auto md:mx-0`} />
            <p className="mt-2 text-sm text-white/60 text-center md:text-left">There are many variations of passages of lorem ipsum avilable, but the majority suffered.</p>
          </div>
          <div className="foot col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Explore</h3>
            <ul>
              {links.map((link, index) => (
                <li key={index} className="py-2 flex gap-2 items-center text-sm">
                  <FaLeaf />
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Contact</h3>
            <div>
              <div className="flex items-center gap-2 py-2">
                <MdCall />
                <span className=" text-sm">123 456 7890</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <MdEmail />
                <a href="mailto:cropPilot@gmail.com" className=" text-sm">
                  cropPilot@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 py-2">
                <IoLocationSharp />
                <span className=" text-sm">Zagazig University, Egypt</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-white/60">&copy; 2025 All Rights Reserved CropPilot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
