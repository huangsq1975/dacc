import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-hero-pattern flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-tfgold/20 flex items-center justify-center mb-6">
        <i className="ri-error-warning-line text-tfgold text-3xl"></i>
      </div>
      <div className="font-playfair text-8xl font-bold text-white/10 mb-4">404</div>
      <h1 className="tf-h1 text-white mb-4">Page Not Found</h1>
      <p className="text-white/50 font-inter mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-7 py-3 bg-tfgold text-navy-900 rounded-full font-inter font-semibold text-sm hover:bg-tfgold-light transition-colors"
      >
        Back to Home
      </button>
    </div>
  )
}
