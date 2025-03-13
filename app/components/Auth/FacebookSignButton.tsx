"use client"; // تأكد من إضافة هذه السطر لأن المكون يعمل على العميل

import API_BASE_URL from "@/app/utils/api/base";
import axios from "axios";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FacebookResponse {
  first_name: string;
  last_name: string;
  email?: string; // البريد الإلكتروني قد يكون غير متوفر
  location?: { name?: string };
  id: string; // User ID
  accessToken: string;
}

const FacebookSignButton = ({ typePage }: { typePage: string }) => {
  const router = useRouter();

  const responseFacebook = async (response: FacebookResponse) => {
    console.log("Facebook Response:", response);

    const { first_name, last_name, email, location, id, accessToken } = response;

    const firstName = first_name;
    const lastName = last_name;
    const userEmail = email || "No email provided"; // قيمة افتراضية للبريد الإلكتروني
    const address = location?.name || "No address provided";
    const userId = id;
    const provider = "facebook";

    console.log("Facebook firstName:", firstName);
    console.log("Facebook lastName:", lastName);
    console.log("Facebook email:", userEmail);
    console.log("Facebook address:", address);
    console.log("Facebook userId:", userId);
    console.log("Facebook accessToken:", accessToken);
    console.log("Facebook provider:", provider);

    try {
      if (typePage === "signin") {
        // تسجيل الدخول
        const loginResponse = await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
          userId,
          accessToken,
          provider,
        });
        console.log("Facebook Login Response:", loginResponse);
        if (loginResponse.status === 200) {
          router.push("/");
        }
      } else {
        // التسجيل
        const registerResponse = await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
          firstName,
          lastName,
          email: userEmail,
          address,
          userId,
          accessToken,
          provider,
        });
        console.log("Facebook Register Response:", registerResponse);
        if (registerResponse.status === 201) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Facebook Error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response Data:", error.response?.data);
      }
    }
  };

  return (
    <FacebookLogin
      appId="1163766375364809" // استبدل هذا بـ App ID الخاص بك
      autoLoad={false}
      fields="first_name,last_name,email,location"
      callback={responseFacebook}
      render={(renderProps: { onClick: () => void }) => (
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={renderProps.onClick}>
          <FaFacebook className="text-blue-600" size={20} />
          <span>{typePage === "signin" ? "Sign in" : "Sign up"} with Facebook</span>
        </Button>
      )}
    />
  );
};

export default FacebookSignButton;
