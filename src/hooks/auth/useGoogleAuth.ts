import { authClient } from 'api/auth'
import type { UseGoogleAuthReturn, User, AuthTokens } from './useGoogleAuth.types'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback/google`

  const login = async (): Promise<{ user: User; tokens: AuthTokens }> => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    })

    // Redireciona para o Google OAuth
    window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`

    // Esta Promise nunca resolve pois haverá redirect, mas mantemos por consistência de tipo
    return new Promise(() => {})
  }

  const handleCallback = async (code: string): Promise<{ user: User; tokens: AuthTokens }> => {
    const response = await authClient.loginWithGoogle(code)

    const user: User = {
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      picture: response.user.picture,
      provider: 'google',
    }

    const tokens: AuthTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: Date.now() + response.expiresIn * 1000,
    }

    return { user, tokens }
  }

  const logout = async (): Promise<void> => {
    const storedTokens = localStorage.getItem('auth_tokens')
    
    if (storedTokens) {
      try {
        const { refreshToken: refresh } = JSON.parse(storedTokens)
        if (refresh) {
          await authClient.logout(refresh)
        }
      } catch (error) {
        console.error('Erro ao revogar token no backend:', error)
      }
    }

    // Limpa tokens do localStorage
    localStorage.removeItem('auth_tokens')
    localStorage.removeItem('auth_user')
  }

  const refreshToken = async (): Promise<AuthTokens> => {
    const storedTokens = localStorage.getItem('auth_tokens')
    if (!storedTokens) {
      throw new Error('Nenhum refresh token disponível')
    }

    const { refreshToken: refresh } = JSON.parse(storedTokens)
    if (!refresh) {
      throw new Error('Refresh token não encontrado')
    }

    // Usa o backend para renovar o token
    const response = await authClient.refreshToken(refresh)

    const tokens: AuthTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: Date.now() + response.expiresIn * 1000,
    }

    return tokens
  }

  return {
    login,
    logout,
    refreshToken,
    handleCallback,
  }
}
