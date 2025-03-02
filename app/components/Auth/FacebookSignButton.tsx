import API_BASE_URL from "@/app/utils/api/base";
import axios from "axios";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const FacebookSignButton = ({ typePage }: { typePage: string }) => {
  const responseFacebook = async (response: any) => {
    console.log(response);

    const firstName = response.first_name;
    const lastName = response.last_name;
    const email = response.email;
    const address = response.location?.name || "No address provided";
    const userId = response.id;
    const accessToken = response.accessToken;
    const provider = "facebook";
    if (typePage === "signin") {
      try {
        await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
          userId,
          accessToken,
          provider,
        });
        redirect("/");
      } catch (error) {
        console.error("Facebook Sign-in Error:", error);
      }
    } else {
      try {
        await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
          firstName,
          lastName,
          email,
          address,
          userId,
          accessToken,
          provider,
        });
        redirect("/signin");
      } catch (error) {
        console.error("Facebook Sign-up Error:", error);
      }
    }
  };

  return (
    <FacebookLogin
      appId="1163766375364809"
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
