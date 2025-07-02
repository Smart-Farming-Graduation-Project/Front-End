"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "../signin/signin.css";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { FaUser, FaCamera } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { registerUser } from "../utils/api/Auth";
import ExternalAuthButton from "../components/Auth/ExternalAuthButton";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    address: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<{ message: string | null } | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setPasswordError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password does not match");
      return;
    }
    setPasswordError("");

    try {
      // Handle image properly - only include if not null
      const { image, ...rest } = formData;
      const registrationData = image ? { ...rest, image } : rest;
      const data = await registerUser(registrationData);
      console.log("Registration Successful:", data);
      setEmailSent(true);
    } catch (apiErrors) {
      console.error("Registration Failed:", apiErrors);
      setError(apiErrors as { message: string });
    }
  };

  return (
    <div className="landing-auth pt-20 pb-10">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md  w-[95%] md:w-[600px]">
        {emailSent ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-green">confirm your email</h1>
            <div className="text-center">
              <p className="mb-4 text-green-600">
                An email has been sent to <strong>{formData.email}</strong>. Please check your inbox.
              </p>
              <Link href="/signin" className="text-sm text-green hover:underline">
                Back to Sign In
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-green">Sign Up</h1>
            <p className="mb-4 text-center">Create a new account</p>
            {error && error.message?.trim() !== "" && <p className="text-sm text-red-500 mb-4 text-center bg-[#ff232325] py-2 rounded-md">{error.message}</p>}
            <form onSubmit={handleSignUp}>
              {/* Profile Image Upload */}
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="image">Profile Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <FaUser className="text-gray-400" size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <FaCamera className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                      <Input type="file" id="image" accept="image/*" onChange={handleImageChange} className="pl-8 py-[20px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* First Name and Last Name in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
              </div>

              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="text" id="username" placeholder="Username" value={formData.userName} onChange={(e) => handleInputChange("userName", e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <IoMdMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>

              {/* Password Field */}
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="pl-8 py-[20px]" required />
                </div>
                {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
              </div>
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>

              {/* Phone and Address in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <MdOutlinePhoneAndroid className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="tel" id="phone" placeholder="Phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <GiPositionMarker className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="address" placeholder="Address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button type="submit" className="w-full py-[20px] mb-4">
                Sign Up
              </Button>
            </form>

            {/* Divider with "or" */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-[#ccc]"></div>
              <span className="text-sm text-green">OR With</span>
              <div className="flex-1 h-px bg-[#ccc]"></div>
            </div>

            {/* Third-Party Sign In Buttons */}
            <div className="flex flex-col gap-2 mb-4">
              <ExternalAuthButton provider="facebook" typePage="signup" />
              <ExternalAuthButton provider="google" typePage="signup" />
            </div>
            {/* Already have an account? Sign In */}
            <div className="text-center">
              <span className="text-sm">Already have an account? </span>
              <Link href="/signin" className="text-sm text-green hover:underline">
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
