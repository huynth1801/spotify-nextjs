import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

export enum TokenError {
  RefreshAccessTokenError,
}

export interface ExtendedToken extends JWT {
  accessToken: string
  refreshToken: string
  accessTokenExpireAt: number
  user: User
  error?: TokenError
}
