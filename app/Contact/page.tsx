import React from "react";
import img_contact from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
const Contact = () => {
  return (
    <main>
      <Crumb crumb={img_contact} />
      <Heading heading="Get in Touch with Us" paragraph="Contact Information" />
    </main>
  );
};

export default Contact;
