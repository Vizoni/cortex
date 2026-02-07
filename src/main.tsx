import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RootRoute } from './routes/rootRoute.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RootRoute />
    </AuthProvider>
  </StrictMode>,
)
