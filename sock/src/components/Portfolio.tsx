import React from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronDown,
  Download,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';

const mockPieData = [
  { name: '金融', value: 40, color: '#adc6ff' },
  { name: '消费', value: 30, color: '#ffb4a9' },
  { name: '科技', value: 20, color: '#78dc77' },
  { name: '能源', value: 10, color: '#414755' },
];

const mockIndustryData = [
  { name: '金融服务', strategy: 82, benchmark: 70 },
  { name: '信息技术', strategy: 45, benchmark: 55 },
  { name: '日常消费', strategy: 95, benchmark: 40 },
  { name: '能源开发', strategy: 30, benchmark: 25 },
  { name: '医疗保健', strategy: 60, benchmark: 58 },
];

export const Portfolio: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Portfolio Sidebar: Strategy Selection */}
      <aside className="w-72 bg-[#1c1b1b] border-r border-[#414755]/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-[#414755]/20 bg-[#201f1f]/30">
          <div className="text-[10px] uppercase tracking-widest text-[#8b90a0] font-black mb-4">活跃策略资产池</div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索策略..." 
              className="w-full bg-[#0e0e0e] border-none text-xs text-[#e5e2e1] px-4 py-2.5 pl-10 rounded-lg focus:ring-1 focus:ring-[#adc6ff]/50 transition-all shadow-inner"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8b90a0]" />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar flex flex-col p-2 space-y-1">
          <div className="bg-[#201f1f] border-l-4 border-[#adc6ff] p-4 rounded-r-xl transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[13px] font-black text-[#adc6ff]">均值回归策略 V2</span>
              <span className="text-[9px] px-2 py-0.5 bg-[#78dc77]/10 text-[#78dc77] rounded font-black border border-[#78dc77]/20 uppercase">Live</span>
            </div>
            <div className="text-[11px] text-[#e5e2e1] font-mono">资产净值: ¥1,245,800</div>
            <div className="mt-3 h-1.5 w-full bg-[#131313] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-[#78dc77] w-[72%] shadow-[0_0_8px_#78dc77]" />
            </div>
          </div>
          {['双均线突破', '多因子Alpha', '套利对冲 A/B'].map((s, i) => (
            <div key={s} className="p-4 hover:bg-[#353534]/50 rounded-xl transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#e5e2e1] group-hover:text-[#adc6ff] transition-colors">{s}</span>
                <span className={cn(
                  "text-[9px] px-2 py-0.5 rounded font-black border uppercase",
                  i === 1 ? "bg-[#ffb4a9]/10 text-[#ffb4a9] border-[#ffb4a9]/20" : "bg-[#414755]/30 text-[#8b90a0] border-[#414755]/20"
                )}>
                  {i === 1 ? 'Testing' : 'Paused'}
                </span>
              </div>
              <div className="text-[11px] text-[#8b90a0] font-mono">资产净值: ¥{i === 1 ? '--' : (3100500 - i * 100000).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Dashboard Panel */}
      <section className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#131313]">
        <div className="grid grid-cols-12 gap-6">
          {/* Top Row: Positions & Pie Chart */}
          <div className="col-span-12 lg:col-span-8 bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center bg-[#2a2a2a]/30 border-b border-[#414755]/10">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-[#adc6ff]" />
                <h3 className="text-xs font-black tracking-widest uppercase">实时持仓明细 (POSITIONS)</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold px-3 py-1.5 bg-[#0e0e0e] text-[#8b90a0] rounded-lg hover:text-[#e5e2e1] border border-[#414755]/30 transition-all">CSV</button>
                <button className="text-[10px] font-bold px-3 py-1.5 bg-[#0e0e0e] text-[#78dc77]/80 rounded-lg hover:text-[#78dc77] border border-[#78dc77]/20 transition-all">批量平仓</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#1c1b1b]/50">
                  <tr className="text-[#8b90a0] text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">标的代码</th>
                    <th className="px-4 py-4 text-right">持仓数量</th>
                    <th className="px-4 py-4 text-right">成本价</th>
                    <th className="px-4 py-4 text-right">现价</th>
                    <th className="px-4 py-4 text-right">盈亏额</th>
                    <th className="px-6 py-4 text-right">收益率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#414755]/5">
                  {[
                    { code: '600519', name: '贵州茅台', qty: '1,200', cost: '1,642.50', price: '1,720.00', pnl: '+93,000', pct: '+4.72%', up: true },
                    { code: '300750', name: '宁德时代', qty: '3,500', cost: '185.20', price: '178.50', pnl: '-23,450', pct: '-3.62%', up: false },
                    { code: '0700', name: '腾讯控股', qty: '800', cost: '285.00', price: '312.40', pnl: '+21,920', pct: '+9.61%', up: true },
                  ].map((pos) => (
                    <tr key={pos.code} className="hover:bg-[#353534]/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="text-sm font-black text-[#e5e2e1]">{pos.name}</div>
                        <div className="text-[10px] font-mono text-[#8b90a0]">{pos.code}.SH</div>
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs font-bold">{pos.qty}</td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-[#8b90a0]">{pos.cost}</td>
                      <td className="px-4 py-4 text-right font-mono text-xs font-bold">{pos.price}</td>
                      <td className={cn("px-4 py-4 text-right font-mono text-xs font-black", pos.up ? "text-[#ffb4a9]" : "text-[#78dc77]")}>{pos.pnl}</td>
                      <td className={cn("px-6 py-4 text-right font-black font-mono text-sm", pos.up ? "text-[#ffb4a9]" : "text-[#78dc77]")}>{pos.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#201f1f] rounded-2xl border border-[#414755]/10 flex flex-col shadow-xl">
            <div className="p-4 bg-[#2a2a2a]/30 border-b border-[#414755]/10">
              <h3 className="text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-[#adc6ff]" />
                板块分布 (SECTOR)
              </h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[300px]">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {mockPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #414755', borderRadius: '8px', fontSize: '10px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#8b90a0' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                <p className="text-[10px] text-[#8b90a0] font-black uppercase tracking-widest">当前总资产净值</p>
                <p className="text-2xl font-black text-[#e5e2e1] font-mono leading-tight">¥6,425,800</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Exposure Chart */}
        <div className="bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-xl">
          <div className="p-4 bg-[#2a2a2a]/30 border-b border-[#414755]/10 flex justify-between items-center">
            <h3 className="text-xs font-black tracking-widest uppercase">行业细分敞口 (INDUSTRY EXPOSURE)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b90a0]">
                <div className="w-2 h-2 rounded-full bg-[#adc6ff]" /> 策略权重
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b90a0]">
                <div className="w-2 h-2 rounded-full bg-[#414755]" /> 基准权重
              </div>
            </div>
          </div>
          <div className="h-72 p-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockIndustryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#414755" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" stroke="#8b90a0" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#adc6ff', fillOpacity: 0.05 }}
                  contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #414755', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="strategy" fill="#adc6ff" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="benchmark" fill="#414755" radius={[4, 4, 0, 0]} barSize={24} fillOpacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Risk Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
          {[
            { label: '波动率 (Sigma)', val: '12.5%', color: 'text-[#e5e2e1]' },
            { label: '贝塔系数 (Beta)', val: '0.92', color: 'text-[#e5e2e1]' },
            { label: '风险价值 (VaR)', val: '1.2M', color: 'text-[#ffb4a9]' },
            { label: '极端回撤 (Tail Risk)', val: '-18.4%', color: 'text-[#78dc77]' },
          ].map((risk) => (
            <div key={risk.label} className="bg-[#1c1b1b] p-4 rounded-xl border border-[#414755]/10 flex items-center justify-between group hover:border-[#adc6ff]/20 transition-all cursor-crosshair shadow-sm">
              <span className="text-[10px] text-[#8b90a0] font-black uppercase tracking-widest">{risk.label}</span>
              <span className={cn("text-sm font-black font-mono", risk.color)}>{risk.val}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
