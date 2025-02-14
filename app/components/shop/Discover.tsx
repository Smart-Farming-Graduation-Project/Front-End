import Image from "next/image";
import React from "react";
import discover from "../../assets/images/discover.jpeg";
import shop_background from "../../assets/images/shop_background.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Discover = () => {
  return (
    <div className="h-screen bg-[#045910] flex items-center justify-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${shop_background.src})` }}>
      {/* Content Section */}
      <div className="container mx-auto px-4 relative z-10 mt-40 md:mt-0 ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <button className="inline-flex items-center space-x-6 text-[#65B95F] mb-4">
              <div className=" rounded-full px-3 py-1 text-sm font-semibold border border-green">HOT</div>
              <div className=" inline-flex group items-center gap-1.5 text-sm ">Fresh Harvest Just In!</div>
            </button>
            <h2 className="text-[3rem] sm:text-[4rem] leading-[55px] mb-6 max-w-full text-white">Discover Freshness, Every Day</h2>{" "}
            <p className="w-full text-[#d1d5db]">Welcome to CropGuard! Dive into our selection of the freshest fruits and vegetables, straight from local farms to your table.</p>{" "}
            <div className="relative mt-5 flex items-center gap-3 pb-6 justify-center md:justify-start">
              <Button className="font-normal text-xl py-6 px-6">
                <Link href="#categoryId"> Shop Now</Link>
              </Button>
              <Link href="/shop">
                <div className="text-white flex items-center gap-2">
                  Learn More
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
          </div>
          {/* Right Section */}
          <div className=" md:w-1/2 flex justify-center">
            <Image src={discover} alt="Discover Freshness" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
