import { NextAuthOptions } from "next-auth"; // Remove Session since it's not used
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import API_BASE_URL from "@/app/utils/api/base";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    refreshToken?: string;
  }

  interface JWT {
    backendToken?: string;
    refreshToken?: string;
    provider?: string;
  }
}

interface ExtendedProfile {
  sub?: string;
  id?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: "1163766375364809",
      clientSecret: "be37206c56544dbe47a065e644914777",
    }),
    GoogleProvider({
      clientId: "806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        try {
          let response;

          if (account.provider === "google" || account.provider === "facebook") {
            response = await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
              userId: profile?.sub || (profile as ExtendedProfile)?.id,
              accessToken: account.access_token,
              provider: account.provider,
            });

            const backendToken = response.data.data.tokens.accessToken;
            const refreshToken = response.data.data.tokens.refreshToken;
            token.backendToken = backendToken;
            token.refreshToken = refreshToken;
            token.provider = account.provider;
          }
        } catch (error) {
          console.error("Error during social login:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
