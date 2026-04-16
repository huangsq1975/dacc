
import { useState, useRef, useEffect } from 'react';

const advisors = [
  {
    name: 'Serra Wei',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/89c8049de2f5b1d235cddaddab5c0277.png',
    description:
      'Serra Wei 女士是一位企业家和投资人，在传统金融、科技和加密货币领域拥有丰富经验。她曾就职于高盛，并持有斯坦福大学商学院工商管理硕士学位。Wei 女士是 Digital Asset Clearing Center（DACC）和 Aegis Custody 的创始人。DACC 获得四家上市公司及领先国际投资者的支持。Aegis Custody 正与联合国（UNDCIF）合作，通过将资本增长与现实变革相结合，重新设计人道主义援助基础设施。她积极参与行业活动，致力于在全球范围内推广区块链技术的应用与发展。',
  },
  {
    name: '李曦寰',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/36ca34a59e03a4f163f2a16c7321f446.png',
    description:
      '李曦寰先生曾担任香港交易所集团战略及项目管理领域的资深负责人,拥有逾 20 年大型金融机构与金融市场基础设施的管理与战略经验。其专业涵盖金融科技战略、金融市场数字化转型、监管协作及大型复杂项目落地,长期参与并推动交易所与金融机构层面的关键创新项目。作为 DACC 的重量级顾问,李曦寰先生为 DACC 在数字资产清算、金融基础设施升级及合规创新方向提供战略指导,助力 DACC 与传统金融体系的深度融合。',
  },
  {
    name: 'Lynne Marlor',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/ef24843cf2e0be121df5f5b4d8b37bf0.png',
    description:
      'Lynne 是 Women in Digital Assets Forums 的创始人。自2017年起,Lynne 在担任纽约梅隆银行非银行金融部门董事总经理兼负责人期间接触到区块链和数字资产,从此进入数字资产领域。她是一位经验丰富的专业人士,在资本市场、财资、流动性、支付和结算领域拥有30年的经验。Lynne 于2018年在牛津大学赛德商学院完成了牛津区块链战略课程。她是金融科技、区块链、加密货币、基础设施和数字资产生态系统的全球演讲者、影响者、投资者和领导者。',
  },
  {
    name: '严宜扬',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/4ddecd82d3632857a31e2f7477302efa.png',
    description:
      '严宜扬先生拥有超过 20 年银行 IT 与金融软件领域经验,深度参与银行全业务线数字化建设,包括存贷、支付清算、风险管理、对公与零售金融等。其职业生涯横跨两岸三地及新加坡,曾在多家国际与区域领先金融科技及软件公司担任高管,主导大型银行核心系统与金融基础设施项目。作为 DACC 高级顾问,严宜扬先生在金融机构数字化转型、清算与支付体系、风险与合规架构,以及云原生与智能化技术落地方面,为 DACC 提供重要的战略与实施支持。',
  },
  {
    name: 'Wendy Sun',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/1c27eaf061faf24e08b0332d48dc609b.png',
    description:
      'Wendy深耕全球金融科技领域20余年,主攻支付与数字金融,在东南亚等国际市场具备深厚行业洞见与卓越领导力,曾任职Beosin、复星、TikTok、腾讯、Grab、蚂蚁集团、银联等企业高管,主导跨境数字金融生态搭建与创新,持有清华五道口金融EMBA、复旦经济学硕士学位,同时为多家国际金融机构提供顾问支持,助力行业人才培养与标准建立。',
  },
];

export default function AdvisorsCarouselZH() {
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
    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(() => {
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
      }, 5000); // 5 seconds per slide
    }
    return () => clearInterval(interval);
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