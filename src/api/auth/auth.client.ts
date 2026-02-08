import { fetchApi } from '../config'
import type {
  AuthResponse,
  GoogleLoginRequest,
  LogoutResponse,
  RefreshTokenRequest,
} from './types'

export const authClient = {
  
  loginWithGoogle: async (code: string): Promise<AuthResponse> => {
    const body: GoogleLoginRequest = { code }
    return fetchApi<AuthResponse>('/api/auth/google/login', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const body: RefreshTokenRequest = { refreshToken }
    return fetchApi<AuthResponse>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  logout: async (refreshToken: string): Promise<LogoutResponse> => {
    const body: RefreshTokenRequest = { refreshToken }
    return fetchApi<LogoutResponse>('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
}
