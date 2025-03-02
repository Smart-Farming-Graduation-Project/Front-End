import API_BASE_URL from "@/app/utils/api/base";
// import axios from "axios";
import React from "react";
import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const GoogleSignButton = ({ typePage }: { typePage: string }) => {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  // const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   // Handle success response
  //   const { givenName, familyName, email, googleId, accessToken } = response.profileObj;

  //   try {
  //     // إرسال البيانات إلى الخادم
  //     await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
  //       firstName: givenName,
  //       lastName: familyName,
  //       email: email,
  //       userId: googleId,
  //       accessToken: accessToken,
  //       provider: "google",
  //     });

  //     // إعادة التوجيه إلى صفحة تسجيل الدخول
  //     redirect("/signin");
  //   } catch (error) {
  //     console.error("Google Sign-up Error:", error);
  //   }
  // };

  return (
    <GoogleLogin
      clientId="http://806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com" // استبدل هذا بـ Client ID الخاص بك
      buttonText="Sign up with Google"
      onSuccess={responseGoogle}
      onFailure={(error) => console.error("Google Login Failed:", error)}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <FcGoogle className="text-xl" />
          <span>{typePage === "signin" ? "Sign in" : "Sign up"} with Google</span>
        </Button>
      )}
    />
  );
};

export default GoogleSignButton;
