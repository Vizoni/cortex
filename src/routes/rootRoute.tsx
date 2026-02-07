import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PrivateRoute } from 'routes/PrivateRoute'

const Login = lazy(() => import('ui/pages/Login').then(module => ({ default: module.Login })))
const Home = lazy(() => import('ui/pages/Home').then(module => ({ default: module.Home })))
const NotFound = lazy(() => import('ui/pages/NotFound').then(module => ({ default: module.NotFound })))

const LoadingPage = () => <div>Carregando...</div>

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <NotFound />
      </Suspense>
    ),
  },
])

export const RootRoute = () => {
  return <RouterProvider router={router} />
}
