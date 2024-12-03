import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import join from "../../assets/images/join_community.jpeg";
import Link from "next/link";

const Join_Community = () => {
  return (
    <div className="join-community bg-[#045910] h-[600px]">
      <div className="flex  flex-col md:flex-row justify-between md:items-center h-full">
        {/* Text Section */}
        <div className="w-full md:w-[50%] px-[15px] order-1 md:order-2 flex flex-col justify-center p-6">
          <div className="info mb-[40px]">
            <h3 className="text-green">Become a Part of Our Growing Family</h3>
            <h2 className="text-[3rem] leading-[55px] mb-6 text-white">Join the CropPilot Community</h2>
            <p className="max-w-[512px] text-[#d1d5db]">Connect with other farmers, share tips, and grow smarter together.</p>
          </div>
          <div className="mt-5 flex items-center gap-6">
            <Button className="font-normal text-xl py-6 px-6">
              <Link href="/community">Join Now</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[50%] h-[300px] md:h-[600px] order-2 md:order-1 overflow-hidden">
          <Image src={join} alt="why-choose" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Join_Community;
