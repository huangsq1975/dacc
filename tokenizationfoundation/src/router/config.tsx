import type { RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/page'
import Approach from '../pages/approach/page'
import Contact from '../pages/contact/page'

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/approach', element: <Approach /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <NotFound /> },
]

export default routes
