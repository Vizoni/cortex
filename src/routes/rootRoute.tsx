import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PrivateRoute } from 'routes/PrivateRoute'

const Landing = lazy(() => import('ui/pages/Landing').then(module => ({ default: module.Landing })))
const Login = lazy(() => import('ui/pages/Login').then(module => ({ default: module.Login })))
const Home = lazy(() => import('ui/pages/Home').then(module => ({ default: module.Home })))
const PrivacyPolicy = lazy(() => import('ui/pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })))
const NotFound = lazy(() => import('ui/pages/NotFound').then(module => ({ default: module.NotFound })))
const GoogleCallback = lazy(() => import('ui/pages/GoogleCallback').then(module => ({ default: module.GoogleCallback })))

const LoadingPage = () => <div>Carregando...</div>

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Landing />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/auth/callback/google',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <GoogleCallback />
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
