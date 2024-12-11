import React from "react";
import img_about from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
function About() {

  return (
    <div>
      <Crumb crumb={img_about}/>
      <Heading heading="Meat Our Team" paragraph="Team Members" />

    </div>
  );
}

export default About;
