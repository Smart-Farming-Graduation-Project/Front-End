"use client";
import axios from "axios";
import API_BASE_URL from "@/app/utils/api/base";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}
interface ProviderButtonProps {
  provider: "facebook" | "google";
  typePage: "signin" | "signup";
}

interface AuthRequest {
  accessToken: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  provider: string;
}

export default function ExternalAuthButton({
  provider,
  typePage,
}: ProviderButtonProps) {
  const router = useRouter();
  const { login } = useAuth();
  useEffect(() => {
    if (provider === "facebook") {
      if (!window.FB) {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.onload = () => {
          window.FB.init({
            appId: "1163766375364809",
            cookie: true,
            xfbml: true,
            version: "v18.0",
          });
        };
        document.body.appendChild(script);
      }
    }
  }, [provider]);
  const handleAuthSuccess = async (response: AuthRequest) => {
    try {
      const endpoint =
        typePage === "signin"
          ? "/Authentication/login-with-third-party"
          : "/Authentication/register-with-third-party";

      const requestData = {
        ...(typePage === "signup" && {
          firstName: response.firstName || "Unknown",
          lastName: response.lastName || "User",
          email:
            response.email || `${response.userId}@${response.provider}.com`,
          address: "Not provided",
          profileImage: response.profileImage || "",
        }),
        accessToken: response.accessToken,
        userId: response.userId,
        provider: response.provider,
      };

      const { data } = await axios.post(
        // `${"https://localhost:7299/api"}${endpoint}`,
        `${API_BASE_URL}${endpoint}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.token) {
        login(data.token, data.refreshToken);
        router.push("/");
        toast.success(
          `${
            response.provider.charAt(0).toUpperCase() +
            response.provider.slice(1)
          } authentication successful`
        );
      }
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      toast.error(errorMessage);
    }
  };
  const handleFacebookLogin = () => {
    if (typeof window !== "undefined" && window.FB) {
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            window.FB.api(
              "/me",
              { fields: "first_name,last_name,email,picture" },
              (userInfo: any) => {
                handleAuthSuccess({
                  firstName: userInfo.first_name,
                  lastName: userInfo.last_name,
                  email: userInfo.email,
                  userId: response.authResponse.userID,
                  accessToken: response.authResponse.accessToken,
                  profileImage: userInfo.picture?.data?.url,
                  provider: "facebook",
                });
                console.log(
                  "Facebook User Info:",
                  userInfo.first_name,
                  userInfo.last_name,
                  userInfo.email,
                  response.authResponse.userID,
                  response.authResponse.accessToken,
                  userInfo.picture?.data?.url
                );
                console.log("Facebook Auth Response:", response.authResponse);
              }
            );
          } else {
            toast.error("Facebook login failed or was cancelled");
          }
        },
        { scope: "public_profile,email" }
      );
    } else {
      toast.error("Facebook SDK not loaded");
    }
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        // console.log("Google User Info:", userInfo.data);

        handleAuthSuccess({
          firstName: userInfo.data.given_name,
          lastName: userInfo.data.family_name,
          email: userInfo.data.email,
          userId: userInfo.data.sub,
          accessToken: tokenResponse.access_token,
          profileImage: userInfo.data.picture,
          provider: "google",
        });
      } catch (error) {
        toast.error("Failed to fetch Google user information");
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  //   const handleFacebookResponse = (response: any) => {
  //     if (response.status === "unknown") {
  //       toast.error("Facebook login failed");
  //       return;
  //     }

  //     handleAuthSuccess({
  //       firstName: response.first_name,
  //       lastName: response.last_name,
  //       email: response.email,
  //       userId: response.id,
  //       accessToken: response.accessToken,
  //       profileImage: response.picture?.data?.url,
  //       provider: "facebook",
  //     });
  //   };

  const ProviderIcon = () => {
    switch (provider) {
      case "facebook":
        return <FaFacebook className="text-blue-600" size={20} />;
      case "google":
        return <FaGoogle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  if (provider === "facebook") {
    return (
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]"
        onClick={handleFacebookLogin}
      >
        <ProviderIcon />
        <span>
          {typePage === "signin" ? "Sign in" : "Sign up"} with Facebook
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]"
      onClick={() => handleGoogleLogin()}
    >
      <ProviderIcon />
      <span>{typePage === "signin" ? "Sign in" : "Sign up"} with Google</span>
    </Button>
  );
}
