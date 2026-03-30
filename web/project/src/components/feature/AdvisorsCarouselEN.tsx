
import React, { useState } from 'react';

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

const GAP = 24;

export default function AdvisorsCarouselEN() {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'https://via.placeholder.com/300x200?text=Image+Unavailable';
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {advisors.map((advisor) => (
          <div key={advisor.name} className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
            <div className="relative w-full h-72 sm:h-64 mb-4 overflow-hidden rounded-lg">
              <img
                src={advisor.image}
                alt={advisor.name}
                onError={handleImageError}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-lg font-bold text-[#1e6b8a] mb-1">{advisor.name}</h3>
            <p className="text-[#1e6b8a] text-sm mb-3 font-medium">{advisor.title}</p>
            <p className="text-[#4a5568] text-xs leading-relaxed break-words whitespace-normal">
              {advisor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
