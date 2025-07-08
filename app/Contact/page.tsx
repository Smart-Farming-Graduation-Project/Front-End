"use client";
import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import img_contact from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { MdSupport } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [state, handleSubmit] = useForm("mrbkyoyb", {
    data: {
      source: typeof window !== "undefined" ? window.location.hostname : "unknown",
    },
  });

  React.useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      console.error("Form errors:", state.errors);
      setFormError("حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.");

      if (typeof window !== "undefined" && toast) {
        toast.error("فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      }
    }
  }, [state.errors]);

  React.useEffect(() => {
    if (state.succeeded) {
      console.log("Form submitted successfully");
      setFormError(null);
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <main>
        <Crumb crumb={img_contact} />
        <div className="container p-sec">
          <Heading heading="Get in Touch with Us" paragraph="Contact Information" />
          <div className="contact-container">
            <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[95%] md:w-[600px] mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center rounded-full bg-green-100 w-16 h-16">
                  <FaCheckCircle className="text-green text-3xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
              <Button onClick={() => window.location.reload()} className="bg-green hover:bg-green-600">
                Send Another Message
              </Button>
            </div>

            {/* Company Info Section */}
            <div className="company-info grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
              <div className="flex flex-col gap-4 text-center p-6">
                <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                  <IoMdMail className="text-green" size={26} />
                </div>
                <span className="font-medium">Email us:</span>
                <p>Email us for general queries, including marketing and partnership opportunities.</p>
                <span className="text-green font-medium">john.doe@gmail.com</span>
              </div>
              <div className="flex flex-col gap-4 text-center p-6">
                <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                  <IoMdCall className="text-green" size={26} />
                </div>
                <span className="font-medium">Call us:</span>
                <p>Call us to speak to a member of our team. We are always happy to help.</p>
                <span className="text-green font-medium">+201234567890</span>
              </div>
              <div className="flex flex-col gap-4 text-center p-6">
                <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                  <MdSupport className="text-green" size={26} />
                </div>
                <span className="font-medium">Support</span>
                <p>Email us for general queries, including marketing and partnership opportunities.</p>
                <Button variant={"outline"} className="text-green font-medium w-fit mx-auto">
                  Support Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const onSubmitWrapper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    try {
      console.log("Form submission attempt from:", window.location.hostname);
      await handleSubmit(e);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");

      if (toast) {
        toast.error("فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  return (
    <main>
      <Crumb crumb={img_contact} />
      <div className="container p-sec">
        <Heading heading="Get in Touch with Us" paragraph="Contact Information" />
        <div className="contact-container">
          <form onSubmit={onSubmitWrapper} className="p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[95%] md:w-[600px] mx-auto">
            {/* إضافة رسالة خطأ عامة في حالة وجود مشكلة */}
            {formError && <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md">{formError}</div>}

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input type="text" id="first_name" name="first_name" placeholder="John" required />
                <ValidationError prefix="First Name" field="first_name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input type="text" id="last_name" name="last_name" placeholder="Doe" required />
                <ValidationError prefix="Last Name" field="last_name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="john.doe@example.com" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" name="phone" placeholder="+201234567890" />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" name="message" placeholder="Tell us how we can help you..." className="h-28 resize-none" required />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            {/* Display general form errors */}
            {state.errors && Object.keys(state.errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">Please fix the errors above and try again.</p>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-4">
              By submitting this form you agree to our <span className="text-green hover:underline cursor-pointer">terms and conditions</span> and our <span className="text-green hover:underline cursor-pointer">privacy policy</span> which explains
              how we may collect, use and disclose your personal information including to third parties.
            </p>

            <Button type="submit" disabled={state.submitting} className="py-3 sm:py-[20px] mb-4 w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {state.submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Message...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>

          {/* Company Info Section */}
          <div className="company-info grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                <IoMdMail className="text-green" size={26} />
              </div>
              <span className="font-medium">Email us:</span>
              <p>Email us for general queries, including marketing and partnership opportunities.</p>
              <span className="text-green font-medium">abdo.ibrahim411@gmail.com</span>
            </div>
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                <IoMdCall className="text-green" size={26} />
              </div>
              <span className="font-medium">Call us:</span>
              <p>Call us to speak to a member of our team. We are always happy to help.</p>
              <span className="text-green font-medium">+201234567890</span>
            </div>
            <div className="flex flex-col gap-4 text-center p-6">
              <div className="flex items-center justify-center rounded-lg bg-[#f0f0f0] w-14 h-14 mx-auto">
                <MdSupport className="text-green" size={26} />
              </div>
              <span className="font-medium">Support</span>
              <p>Email us for general queries, including marketing and partnership opportunities.</p>
              <Button variant={"outline"} className="text-green font-medium w-fit mx-auto">
                Support Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
