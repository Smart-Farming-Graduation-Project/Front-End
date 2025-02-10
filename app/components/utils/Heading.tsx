import React from "react";

type Props = {
  heading: string;
  paragraph: string;
};

const Heading = ({ heading, paragraph }: Props) => {
  return (
    <div className="text-center">
      <h2 className="main-heading text-[2rem] md:text-[3rem]">{heading}</h2>
      <p className="main-paragraph  mt-[-35px] mb-10">{paragraph}</p>
    </div>
  );
};

export default Heading;
