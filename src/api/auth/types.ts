
export type GoogleLoginRequest = {
  code: string
}

export type RefreshTokenRequest = {
  refreshToken: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    name: string
    picture?: string
  }
}

export type LogoutResponse = {
  message: string
}
