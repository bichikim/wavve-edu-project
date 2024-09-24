import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomePage} from 'src/pages/home/HomePage'
import {Calculating} from 'src/pages/practice/Calculating'
import type {Router as RouterType} from '@remix-run/router'

const router: RouterType = createBrowserRouter([
  {
    Component: HomePage,
    path: '/',
  },
  {
    path: '/practice/calculating',
    Component: Calculating,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
