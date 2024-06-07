import { scopes } from "@/config/spotify";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { signIn } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
