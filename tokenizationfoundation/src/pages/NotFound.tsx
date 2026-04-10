import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      <main className="flex-1 tf-section flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-tfblue/15 flex items-center justify-center mb-6">
          <i className="ri-error-warning-line text-tfblue text-3xl"></i>
        </div>
        <div className="font-display text-8xl font-bold text-[#0066ff]/20 mb-4 tracking-tighter">404</div>
        <h1 className="tf-headline text-navy-900 mb-4">Page Not Found</h1>
        <p className="tf-body text-navy-900/70 mb-8 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-7 py-3 bg-[#0071bc] text-white rounded-full tf-body font-semibold hover:bg-[#0066cc] transition-colors"
        >
          Back to Home
        </button>
      </main>
      <Footer />
    </div>
  )
}
