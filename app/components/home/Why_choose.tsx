import Image from "next/image";
import React from "react";
import why from "../../assets/images/why-choose.jpeg";
import { FaAppleAlt } from "react-icons/fa";
import { FaTractor } from "react-icons/fa6";

const Why_choose = () => {
  const chooseIcons = [
    { icon: <FaAppleAlt className="mt-1" />, text: "Fresh, locally-sourced fruits and vegetables." },
    { icon: <FaTractor className="mt-1" />, text: "Rent top-notch farming equipment." },
    { icon: <FaAppleAlt className="mt-1" />, text: "Fresh, locally-sourced fruits and vegetables." },
    { icon: <FaTractor className="mt-1" />, text: "Rent top-notch farming equipment." },
  ];
  return (
    <div className="why-choose p-sec">
      <div className="container flex gap-6 md:gap-8 flex-col justify-center md:justify-between lg:flex-row lg:items-center">
        <div className="w-full lg:w-[50%]">
          <div className="info mb-[40px]">
            <h2 className="text-[3rem]">Why Choose CropPilot?</h2>
            <p className=" max-w-[512px]">We connect you with the freshest produce and innovative farming equipment to support sustainable agriculture.</p>
          </div>
          <hr />
          <div className="choose-container py-6 flex justify-between gap-y-6 flex-wrap">
            {chooseIcons.map((item, index) => (
              <div key={index} className="choose flex items-start gap-2 text-[18px] w-full md:w-[48%]">
                {item.icon}
                <h5 className="font-[600]">{item.text}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image src={why} alt="why-choose" className="rounded-lg  h-[25rem] md:h-[37.5rem] w-[20rem] md:w-[27rem] max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Why_choose;
