
import { useState } from 'react';

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

const GAP = 24;

export default function AdvisorsCarouselZH() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {advisors.map((advisor, index) => (
          <div key={index} className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
            <div className="relative w-full h-72 sm:h-64 mb-4 overflow-hidden rounded-lg">
              <img
                src={advisor.image}
                alt={advisor.name}
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