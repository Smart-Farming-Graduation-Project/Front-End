"use client";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import "./Crumb.css";
interface Props {
  crumb: StaticImageData;
}
const Crumb = ({ crumb }: Props) => {
  const pathname = usePathname().slice(1).replaceAll("/", " - ");

  return (
    <div className="crumb relative ">
      <div className="crumb-img h-[300px] md:h-[400px] w-full relative">
        <Image src={crumb} alt="crumb" className="object-cover h-full w-full" />
        <div className="crumb-overlay"></div>
      </div>
      <div className="crumb-text absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-3xl breadcrumb-text">{pathname}</h1>
      </div>
    </div>
  );
};

export default Crumb;
