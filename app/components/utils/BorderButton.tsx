import React from "react";

type Props = {
  children: React.ReactNode;
};

const BorderButton = (props: Props) => {
  return (
    <button
      className="w-fit px-[20px] group text-[14px] whitespace-nowrap font-normal text-white flex gap-2 items-center rounded-full border border-white bg-white/0 hover:bg-white/10 hover:transition-all hover:duration-300"
      style={{ height: "35px" }}>
      {props.children}
    </button>
  );
};

export default BorderButton;
