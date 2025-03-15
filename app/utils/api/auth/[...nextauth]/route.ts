import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";
import API_BASE_URL from "@/app/utils/api/base";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: "1163766375364809",
      clientSecret: "be37206c56544dbe47a065e644914777",
      scope: "public_profile,email",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const provider = "facebook";
      const userId = account?.providerAccountId;
      const accessToken = account?.access_token;
      console.log("User:", user, "Account:", account);
      try {
        const loginResponse = await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
          userId,
          accessToken,
          provider,
        });

        if (loginResponse.status === 200) {
          return true;
        }
      } catch (error) {
        try {
          const registerResponse = await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
            firstName: user.name?.split(" ")[0] || "Unknown",
            lastName: user.name?.split(" ").slice(1).join(" ") || "Unknown",
            email: user.email || "No email provided",
            address: "No address provided",
            userId,
            accessToken,
            provider,
          });

          if (registerResponse.status === 201) {
            return true;
          }
        } catch (registerError) {
          console.error("Register Error:", registerError);
          return false;
        }
      }
      return false;
    },
    async redirect({ baseUrl }) {
      return baseUrl; // Redirect to homepage ("/")
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
