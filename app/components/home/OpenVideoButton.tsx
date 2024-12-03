"use client";
import React, { useState } from "react";
import { TiMediaPlay } from "react-icons/ti";
type Props = {
  vid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OpenVideoButton = ({ vid }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="relative flex items-center justify-center">
      <button onClick={openModal} className="bg-green-500 p-2 right-4 rounded-lg hover:bg-hover-button ease relative z-[20] border">
        <TiMediaPlay className="text-white text-3xl" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-[90%] ">
            {/* close */}
            <div className="flex justify-end py-1 px-2">
              <button onClick={closeModal} className="text-gray-600 hover:text-black">
                ✖
              </button>
            </div>
            {/* video */}
            <div className="relative w-full h-full pb-[55%]">
              <iframe src="https://www.youtube.com/embed/TloEexWU18Y" className="absolute top-0 left-0 w-full h-full" title="Video" allow="autoplay; fullscreen" />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenVideoButton;
