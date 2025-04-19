"use client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/app/utils/api/base";
import Cookies from "js-cookie";

interface PropsType {
  typePage: "signin" | "signup";
}

interface DecodedToken {
  given_name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

const GoogleSignButton = ({ typePage }: PropsType) => {
  const router = useRouter();

  const login = async (credentialResponse: { credential?: string }) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
      console.log("Google User Data:", decoded);

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
    <div className="w-full">
      <GoogleLogin
        onSuccess={login}
        onError={handleFailure}
        useOneTap
        shape="rectangular"
        size="large"
        text={typePage === "signin" ? "signin_with" : "signup_with"}
        width="100%"
      />
    </div>
  );
};

export default function WrappedGoogleSignButton({ typePage }: { typePage: "signin" | "signup" }) {
  const clientId = process.env.GOOGLE_CLIENT_ID || "806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com";
  
  if (!clientId) {
    console.error("Google Client ID is missing");
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleSignButton typePage={typePage} />
    </GoogleOAuthProvider>
  );
}