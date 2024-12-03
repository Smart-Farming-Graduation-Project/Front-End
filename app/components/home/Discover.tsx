import Image from "next/image";
import React from "react";
import discover from "../../assets/images/discover.jpeg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Discover = () => {
  return (
    <div className="discover">
      <div className="flex gap-6 md:gap-8 flex-col justify-between md:flex-row md:items-center">
        <div className="w-[550px] mx-auto px-[15px] max-w-full md:w-[50%]">
          <div className="info mb-[40px]">
            <h2 className="text-[3rem] sm:text-[4rem] leading-[55px] mb-6 max-w-full">Discover Freshness, Every Day</h2>
            <p className=" max-w-full w-[512px]">Welcome to CropPilot! Dive into our selection of the freshest fruits and vegetables, straight from local farms to your table.</p>
          </div>
          <div className="relative mt-5 flex items-center gap-6 pb-6">
            <Button className="font-normal text-xl py-6 px-6">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Link href="/">
              <div className="text-black flex items-center gap-2">
                Learn More
                <FaArrowRightLong />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <Image src={discover} alt="why-choose" className="max-w-full md:object-fill h-[350px] sm:h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Discover;
