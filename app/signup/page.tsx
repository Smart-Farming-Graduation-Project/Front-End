"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import "../signin/signin.css";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { registerUser, registerWithThirdParty } from "../utils/api/Auth";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, facebookProvider, googleProvider } from "../utils/api/firebase";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<{ Message: string | null } | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Password does not match");
      return;
    }
    setPasswordError("");

    try {
      const data = await registerUser({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        userName,
        phone,
        address,
      });

      console.log("Registration Successful:", data);
      setEmailSent(true);
    } catch (apiErrors) {
      console.error("Registration Failed:", apiErrors);
      setError(apiErrors as { Message: string });
    }
  };
  const handleThirdPartySignUp = async (provider: "google" | "facebook") => {
    try {
      let result;
      if (provider === "google") {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        result = await signInWithPopup(auth, facebookProvider);
      }

      const idToken = await result.user.getIdToken();
      const response = await registerWithThirdParty(provider, idToken);

      console.log(`${provider} Sign-Up Successful:`, response);
      router.push("/dashboard");
    } catch (error) {
      console.error(`${provider} Sign-Up Failed:`, error);
    }
  };

  return (
    <div className="landing-auth pt-20 pb-10">
      <div className="relative mb-4">
        <h1 className="text-white text-4xl md:text-6xl text-center mb-2">Welcome To CropGuard</h1>
        <p className="text-white text-center">Protecting Your Crops, Securing Your Future</p>
      </div>
      <div className="form-container relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-[90%] sm:w-[80%] md:w-[600px]">
        {emailSent ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-green">confirm your email</h1>
            <div className="text-center">
              <p className="mb-4 text-green-600">
                An email has been sent to <strong>{email}</strong>. Please check your inbox.
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
            {error && error.Message !== "" && <p className="text-sm text-red-500 mb-4 text-center bg-[#ff232325] py-2 rounded-md">{error.Message}</p>}
            <form onSubmit={handleSignUp}>
              {/* First Name and Last Name in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
              </div>

              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="text" id="username" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <IoMdMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>

              {/* Password and Confirm Password in one row */}
              {/* Password Field */}
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500 mt-1">{passwordError}</p> // رسالة الخطأ
                )}
              </div>
              <div className="grid items-center gap-1.5 mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <IoIosLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                  <Input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-8 py-[20px]" required />
                </div>
              </div>

              {/* Phone and Address in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <MdOutlinePhoneAndroid className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="tel" id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <GiPositionMarker className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green" size={18} />
                    <Input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="pl-8 py-[20px]" required />
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button type="submit" className="w-full py-[20px] mb-4">
                Sign Up
              </Button>

              {/* Divider with "or" */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-[#ccc]"></div>
                <span className="text-sm text-green">OR With</span>
                <div className="flex-1 h-px bg-[#ccc]"></div>
              </div>

              {/* Third-Party Sign In Buttons */}
              <div className="flex flex-col gap-2 mb-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={() => handleThirdPartySignUp("google")}>
                  <FcGoogle size={20} />
                  <span>Sign up with Google</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={() => handleThirdPartySignUp("facebook")}>
                  <FaFacebook className="text-blue-600" size={20} />
                  <span>Sign up with Facebook</span>
                </Button>
              </div>

              {/* Already have an account? Sign In */}
              <div className="text-center">
                <span className="text-sm">Already have an account? </span>
                <Link href="/signin" className="text-sm text-green hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
