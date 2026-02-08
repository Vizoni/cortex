import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { 
  AuthContextType, 
  SocialProvider, 
  User, 
  AuthTokens,
  AuthProviderProps
} from './AuthContext.types'
import { useGoogleAuth } from 'hooks/auth/useGoogleAuth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper: valida se o token ainda é válido
const isTokenValid = (tokens: AuthTokens | null): boolean => {
  if (!tokens || !tokens.accessToken) return false
  if (!tokens.expiresAt) return true // Se não tem expiração, considera válido
  return Date.now() < tokens.expiresAt
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const googleAuth = useMemo(() => useGoogleAuth(), [])

  // Carrega estado da autenticação do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    const storedTokens = localStorage.getItem('auth_tokens')

    if (storedUser && storedTokens) {
      const parsedTokens = JSON.parse(storedTokens)
      
      // Valida se o token ainda é válido
      if (isTokenValid(parsedTokens)) {
        setUser(JSON.parse(storedUser))
        setTokens(parsedTokens)
      } else {
        // Token expirado, limpa tudo
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_tokens')
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (user && tokens) {
      localStorage.setItem('auth_user', JSON.stringify(user))
      localStorage.setItem('auth_tokens', JSON.stringify(tokens))
    }
  }, [user, tokens])

  const login = async (provider: SocialProvider): Promise<void> => {
    setIsLoading(true)
    try {
      switch (provider) {
        case 'google':
          await googleAuth.login()
          break
        case 'linkedin':
          // TODO: Implementar LinkedIn auth
          throw new Error('LinkedIn auth ainda não implementado')
        default:
          throw new Error(`Provider ${provider} não suportado`)
      }
    } catch (error) {
      console.error('Erro no login:', error)
      setIsLoading(false)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    if (!user) return

    try {
      switch (user.provider) {
        case 'google':
          await googleAuth.logout()
          break
        case 'linkedin':
          // TODO: Implementar LinkedIn logout
          break
      }
    } finally {
      setUser(null)
      setTokens(null)
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_tokens')
    }
  }

  const refreshAccessToken = async (): Promise<void> => {
    if (!user || !tokens) return

    try {
      let newTokens: AuthTokens

      switch (user.provider) {
        case 'google':
          newTokens = await googleAuth.refreshToken()
          break
        case 'linkedin':
          // TODO: Implementar LinkedIn refresh
          throw new Error('LinkedIn refresh ainda não implementado')
        default:
          throw new Error(`Provider ${user.provider} não suportado`)
      }

      setTokens(newTokens)
    } catch (error) {
      console.error('Erro ao renovar token:', error)
      // Se falhar, desloga o usuário
      await logout()
    }
  }

  // Função auxiliar para ser chamada no callback após OAuth redirect
  // Memoizada com useCallback para evitar recriações e re-renders
  const handleAuthCallback = useCallback(async (provider: SocialProvider, code: string): Promise<void> => {
    setIsLoading(true)
    try {
      let result: { user: User; tokens: AuthTokens }

      switch (provider) {
        case 'google':
          if (!googleAuth.handleCallback) {
            throw new Error('handleCallback não implementado')
          }
          result = await googleAuth.handleCallback(code)
          break
        case 'linkedin':
          // TODO: Implementar LinkedIn callback
          throw new Error('LinkedIn callback ainda não implementado')
        default:
          throw new Error(`Provider ${provider} não suportado`)
      }

      setUser(result.user)
      setTokens(result.tokens)
    } catch (error) {
      console.error('Erro no callback de autenticação:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [googleAuth])

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated: !!user && !!tokens && isTokenValid(tokens),
    isLoading,
    login,
    logout,
    refreshAccessToken,
  }

  // Expõe handleAuthCallback via contexto (opcional, ou pode ser uma função global)
  return (
    <AuthContext.Provider value={{ ...value, handleAuthCallback } as any}>
      {children}
    </AuthContext.Provider>
  )
}
