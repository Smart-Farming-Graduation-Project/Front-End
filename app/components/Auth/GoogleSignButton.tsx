"use client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/app/utils/api/base";
import Cookies from "js-cookie";

const GOOGLE_CLIENT_ID = "806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com";

interface PropsType {
  typePage: string;
}

interface DecodedToken {
  given_name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

const GoogleSignButton = ({ typePage }: PropsType) => {
  const router = useRouter();

  const login = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
      console.log("Google User Data:", decoded);
      console.log("token:", credentialResponse.credential);

      const { given_name: firstName, family_name: lastName, email, sub: userId } = decoded;

      if (!firstName || !lastName || !email || !userId) {
        throw new Error("Missing required user data from Google.");
      }

      const provider = "google";
      const address = "No address provided";

      if (typePage === "signin") {
        const loginResponse = await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
          userId,
          accessToken: credentialResponse.credential,
          provider,
        });
        console.log("Google Login Response:", loginResponse);
        if (loginResponse.status === 200) {
          Cookies.set("token", loginResponse.data.data.tokens.accessToken);
          router.push("/");
        }
      } else {
        const registerResponse = await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
          firstName,
          lastName,
          email,
          address,
          userId,
          accessToken: credentialResponse.credential,
          provider,
        });
        console.log("Google Register Response:", registerResponse);
        if (registerResponse.status === 201) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Google Error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response Data:", error.response?.data);
      }
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={login} 
      onError={handleFailure}
      useOneTap 
      render={({ onClick }) => (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]"
          onClick={onClick}
        >
          <FcGoogle className="text-xl" />
          <span>{typePage === "signin" ? "Sign in" : "Sign up"} with Google</span>
        </Button>
      )}
    />
  );
};

export default function WrappedGoogleSignButton({ typePage }: { typePage: string }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleSignButton typePage={typePage} />
    </GoogleOAuthProvider>
  );
}
