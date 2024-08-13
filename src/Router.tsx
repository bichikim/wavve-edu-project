import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomePage} from 'src/pages/home/HomePage'
import type {Router as RouterType} from '@remix-run/router'

const router: RouterType = createBrowserRouter([
  {
    Component: HomePage,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
