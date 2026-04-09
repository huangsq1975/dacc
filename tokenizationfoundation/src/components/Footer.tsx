import inIcon from '../assets/icons8-linkedin-480.png'
import headerBanner from '../assets/HeaderBanner-128X191.png'

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden w-full bg-bottom bg-no-repeat bg-[#f3f6fb]"
      style={{ backgroundImage: `url(${headerBanner})`, backgroundSize: '100% auto' }}
    >
      <div className="relative min-h-[120px] md:min-h-[160px]">
        <div
          className="absolute left-2 bottom-2 md:left-6 md:bottom-4 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center z-10"
          style={{ transform: 'translateY(-60px) translateX(20px)' }}
        >
          <a
            href="https://www.linkedin.com/company/tokenization-foundation"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tokenization Foundation LinkedIn"
            className="w-full h-full"
          >
            <img src={inIcon} alt="LinkedIn icon" className="w-full h-full object-contain" />
          </a>
        </div>
      </div>
    </footer>
  )
}
