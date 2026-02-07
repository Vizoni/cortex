import type { UseGoogleAuthReturn, User, AuthTokens } from './useGoogleAuth.types'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

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
    // Troca o code por tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Falha ao obter tokens do Google')
    }

    const tokenData = await tokenResponse.json()

    // Busca informações do usuário
    const userResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Falha ao obter informações do usuário')
    }

    const userData = await userResponse.json()

    const user: User = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      provider: 'google',
    }

    const tokens: AuthTokens = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: Date.now() + tokenData.expires_in * 1000,
    }

    return { user, tokens }
  }

  const logout = async (): Promise<void> => {
    // Limpa tokens do localStorage
    localStorage.removeItem('auth_tokens')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('isAuthenticated')
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

    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        refresh_token: refresh,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error('Falha ao renovar token')
    }

    const data = await response.json()

    const tokens: AuthTokens = {
      accessToken: data.access_token,
      refreshToken: refresh, // Google mantém o mesmo refresh token
      expiresAt: Date.now() + data.expires_in * 1000,
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
