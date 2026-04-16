import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import BackToTop from './components/feature/BackToTop'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
      <BackToTop />
    </BrowserRouter>
  )
}

export default App