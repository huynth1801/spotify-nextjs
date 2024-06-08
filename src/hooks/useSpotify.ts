import { spotifyApi } from "@/config/spotify"
import { ExtendedSession, TokenError } from "@/types"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    // Type guard to check if the session is an ExtendedSession
    const isExtendedSession = (session: any): session is ExtendedSession => {
      return (session as ExtendedSession).accessToken !== undefined
    }

    if (isExtendedSession(session)) {
      // If refresh token failed, redirect to login
      if (session.error === TokenError.RefreshAccessTokenError) {
        signIn()
      } else {
        spotifyApi.setAccessToken(session.accessToken)
      }
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
