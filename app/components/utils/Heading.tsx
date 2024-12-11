import React from "react";

type Props = {
  heading: string;
  paragraph: string;
};

const Heading = ({ heading, paragraph }: Props) => {
  return (
    <div className="text-center">
      <p className="main-paragraph mb-[-30px]">{paragraph}</p>
      <h1 className="">{heading}</h1>
    </div>
  );
};

export default Heading;
