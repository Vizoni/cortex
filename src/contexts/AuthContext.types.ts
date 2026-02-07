import type { ReactNode } from 'react'

export type SocialProvider = 'google' | 'linkedin'

export interface User {
  id: string
  email: string
  name: string
  picture?: string
  provider: SocialProvider
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (provider: SocialProvider) => Promise<void>
  logout: () => Promise<void>
  refreshAccessToken: () => Promise<void>
  handleAuthCallback?: (provider: SocialProvider, code: string) => Promise<void>
}

export interface AuthProviderProps {
  children: ReactNode
}
