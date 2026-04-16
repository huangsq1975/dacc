
import React, { useState, useRef, useEffect } from 'react';

const advisors = [
  {
    name: 'Serra Wei',
    title: 'Director',
    image:
      'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/89c8049de2f5b1d235cddaddab5c0277.png',
    description:
      'Ms. Serra Wei is an entrepreneur and investor with extensive experience in traditional finance, technology and cryptocurrency. She previously worked at Goldman Sachs and holds an MBA from the Stanford Graduate School of Business. Ms. Wei is the founder of Digital Asset Clearing Center (DACC) and Aegis Custody. DACC is backed by four public traded companies and leading international investors. Aegis Custody is working with United Nations (UNDCIF) to redesign humanitarian aid infrastructure by aligning capital growth with real-world change. She is an active participant in industry activities and is committed to promoting the application and development of blockchain technology globally.',
  },
  {
    name: 'Larry Li',
    title: 'Director',
    image:
      'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/36ca34a59e03a4f163f2a16c7321f446.png',
    description:
      "Mr. Larry Li was a senior executive in strategy and project management at Hong Kong Exchanges and Clearing (HKEX), with over 20 years of experience across major financial institutions and market infrastructures. His expertise spans fintech strategy, financial market digital transformation, regulatory engagement, and the delivery of large‑scale, mission‑critical initiatives. As a senior advisor to DACC, Mr. Li provides strategic guidance on digital asset clearing, financial infrastructure modernization, and compliant innovation, supporting DACC's integration with global capital markets.",
  },
  {
    name: 'Lynne Marlor',
    title: 'Director',
    image:
      'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/ef24843cf2e0be121df5f5b4d8b37bf0.png',
    description:
      "Lynne is the Founder of Women in Digital Assets Forums. Lynne has been in the Digital Asset space since 2017 when she was introduced to blockchain and digital assets as the Managing Director and Head of BNY's Non‑Bank Financial Sector. She is a seasoned professional with 30 years within capital markets, treasury, liquidity, payments and settlements. Lynne completed the Oxford Blockchain Strategy Program at Said Business School at Oxford University in 2018. She is a frequent global speaker, influencer, investor and leader in the fintech, blockchain, crypto, infrastructure, digital assets ecosystems.",
  },
  {
    name: 'Stony Yen',
    title: 'Director',
    image:
      'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/58a57df25d62987b967372c0eef01a7a.png',
    description:
      'Mr. Stony Yen has over 20 years of experience in banking IT and financial software, with deep expertise across full banking business lines, including lending, payments, risk management, corporate and retail banking. His career spans Greater China and Singapore, where he has held senior executive roles at leading financial technology and software firms, delivering large‑scale core banking and financial infrastructure projects. As a Senior Advisor to DACC, Mr. Yen provides strategic and practical guidance on financial institution digital transformation, clearing and payment systems, risk and compliance architecture, and the application of cloud‑native and intelligent technologies.',
  },
  {
    name: 'Wendy Sun',
    title: 'Director',
    image:
      'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/1c27eaf061faf24e08b0332d48dc609b.png',
    description:
      'Wendy Sun is a 20‑year global fintech vet specializing in payments and digital financial services, with profound insights, strong leadership and rich experience in Southeast Asia & global markets. Previously at Beosin, Fosun, TikTok, Tencent, Grab, Ant Financial and UnionPay, she led cross‑border digital finance ecosystem building and fintech innovation. She holds Tsinghua EMBA & Fudan Economics Master\'s, and advises international financial institutions on fintech talent development and industry standards.',
  },
];

export default function AdvisorsCarouselEN() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate current index based on scroll position
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
      if (itemWidth > 0) {
        const newIndex = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Auto-scroll logic with pause on hover
  useEffect(() => {
    const interval = !isHovered
      ? setInterval(() => {
        if (scrollRef.current) {
          const nextIndex = (currentIndex + 1) % advisors.length;
          const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
          
          if (nextIndex === 0) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollTo({ left: nextIndex * itemWidth, behavior: 'smooth' });
          }
          setCurrentIndex(nextIndex);
        }
      }, 5000) // 5 seconds per slide
      : undefined;

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isHovered, currentIndex]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
      scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  const goToSlide = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
      scrollRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'https://via.placeholder.com/300x200?text=Image+Unavailable';
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto px-4 py-8 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons (Left & Right Chevrons) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 z-10">
        <button 
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 text-gray-800'}`}
        >
          <i className="ri-arrow-left-s-line text-5xl font-light"></i>
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-8 z-10">
        <button 
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 text-gray-800'}`}
        >
          <i className="ri-arrow-right-s-line text-5xl font-light"></i>
        </button>
      </div>

      {/* Scrollable Container (Single Item View) */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {advisors.map((advisor, index) => (
          <div 
            key={index} 
            className="snap-center flex-shrink-0 w-full flex flex-col items-center justify-center px-8 md:px-16"
          >
            {/* Avatar */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 shadow-md border border-gray-100">
              <img
                src={advisor.image}
                alt={advisor.name}
                onError={handleImageError}
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            {/* Name & Title */}
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-1">{advisor.name}</h3>
              <p className="text-gray-500 text-sm font-medium">{advisor.title}</p>
            </div>
            
            {/* Description / Quote */}
            <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed max-w-3xl">
              {advisor.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Pagination Indicator (Green hollow circles) */}
      <div className="flex justify-center mt-12 space-x-4">
        {advisors.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => goToSlide(idx)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 ${
              currentIndex === idx 
                ? 'bg-[#1e6b8a] border-[#1e6b8a]' 
                : 'bg-transparent border-[#1e6b8a] hover:bg-[#1e6b8a]/20'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
