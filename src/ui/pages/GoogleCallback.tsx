import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'

export const GoogleCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { handleAuthCallback } = useAuth() as any
  const hasProcessed = useRef(false)

  useEffect(() => {
    // Previne múltiplas execuções
    if (hasProcessed.current) return

    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      console.error('Erro na autenticação:', error)
      navigate('/login')
      return
    }

    if (code) {
      hasProcessed.current = true
      handleAuthCallback('google', code)
        .then(() => {
          navigate('/app/home')
        })
        .catch((err: Error) => {
          console.error('Erro ao processar callback:', err)
          hasProcessed.current = false // Permite retry em caso de erro
          navigate('/login')
        })
    }
  }, [searchParams, navigate, handleAuthCallback])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="text-gray-600">Processando autenticação...</p>
      </div>
    </div>
  )
}
