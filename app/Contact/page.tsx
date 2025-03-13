import React from "react";
import img_contact from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { MdSupport } from "react-icons/md";
const Contact = () => {
  return (
    <main>
      <Crumb crumb={img_contact} />
      <div className="container p-sec">
        <Heading heading="Get in Touch with Us" paragraph="Contact Information" />
        <div className="contact-container">
          <form action="" className="p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[95%] md:w-[600px] mx-auto">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input type="text" id="first_name" placeholder="crop" />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input type="text" id="last_name" placeholder="guard" />
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="crop@gmail.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" placeholder="+201234567890" />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" placeholder="Leave a comment" className="h-28 resize-none" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              By submitting this form you agree to our <span className="text-green hover:underline cursor-pointer">terms and conditions</span> and our <span className="text-green hover:underline cursor-pointer">privacy policy</span> which explains
              how we may collect, use and disclose your personal information including to third parties.
            </p>
            <Button type="submit" className=" py-3 sm:py-[20px] mb-4">
              Send Message
            </Button>
          </form>
          <div className="company-info grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                <IoMdMail className="text-green" size={26} />
              </div>
              <span className="font-medium">Email us:</span>
              <p >Email us for general queries, including marketing and partnership opportunities.</p>
              <span className="text-green font-medium">cropguard@gmail.com</span>
            </div>
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                <IoMdCall  className="text-green" size={26} />
              </div>
              <span className="font-medium">Call us:</span>
              <p >Call us to speak to a member of our team. We are always happy to help.</p>
              <span className="text-green font-medium">+201234567890</span>
            </div>
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
              <MdSupport  className="text-green" size={26} />
              </div>
              <span className="font-medium">Support</span>
              <p >Email us for general queries, including marketing and partnership opportunities.</p>
              <Button variant={"outline"} className="text-green font-medium w-fit mx-auto">Support Center</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
