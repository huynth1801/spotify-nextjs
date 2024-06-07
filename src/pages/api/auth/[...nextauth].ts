import { scopes, spotifyApi } from "@/config/spotify"
import { ExtendedToken, TokenError } from "@/types"
import { CallbacksOptions } from "next-auth"
import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"
import { signIn } from "next-auth/react"

const refreshAccessToken = async (
  token: ExtendedToken
): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshTokens } = await spotifyApi.refreshAccessToken()

    console.log("REFRESHED TOKENS ARE", refreshTokens)

    return {
      ...token,
      accessToken: refreshTokens.access_token,
      refreshToken: refreshTokens.refresh_token || token.refreshToken,
      accessTokenExpireAt: Date.now() + refreshTokens.expires_in * 1000,
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: TokenError.RefreshAccessTokenError,
    }
  }
}

const jwtCallback: CallbacksOptions["jwt"] = async ({
  token,
  account,
  user,
}) => {
  let extendedToken: ExtendedToken

  // User log in for the first time
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpireAt: (account.expires_at as number) * 1000,
    }

    console.log("First time login , extended token", extendedToken)
    return extendedToken
  }

  // Subsequent request to check auth sessions
  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpireAt) {
    console.log("Accesst token still valid, returning extended token", token)
    return token
  }

  // Access token has expired , refresh it
  console.log("ACCESS TOKEN IS EXPIRED, REFRESHING")
  return await refreshAccessToken(token as ExtendedToken)
}

export default NextAuth({
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

  callbacks: {
    jwt: jwtCallback,
  },
})
