export type SocialNetworkProvider = 'google' | 'linkedin'

export type User = {
  id: string
  email: string
  name: string
  picture?: string
  provider: SocialNetworkProvider
}

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

export type UseGoogleAuthReturn = {
  login: () => Promise<{ user: User; tokens: AuthTokens }>
  logout: () => Promise<void>
  refreshToken: () => Promise<AuthTokens>
  handleCallback?: (code: string) => Promise<{ user: User; tokens: AuthTokens }>
}
