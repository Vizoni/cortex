const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3008'

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
}

export const buildApiUrl = (endpoint: string): string => {
  return `${apiConfig.baseURL}${endpoint}`
}

export const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const url = buildApiUrl(endpoint)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Erro desconhecido',
      }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao fazer requisição')
  }
}
