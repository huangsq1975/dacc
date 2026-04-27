import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Scale, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Layers,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { cn } from '../lib/utils';
import { PerformanceSnapshot } from '../types';

const mockPerformance: PerformanceSnapshot[] = [
  { date: '01-01', strategy: 100, benchmark: 100 },
  { date: '01-05', strategy: 105, benchmark: 101 },
  { date: '01-10', strategy: 102, benchmark: 99 },
  { date: '01-15', strategy: 110, benchmark: 102 },
  { date: '01-20', strategy: 108, benchmark: 103 },
  { date: '01-25', strategy: 115, benchmark: 105 },
  { date: '02-01', strategy: 118, benchmark: 104 },
  { date: '02-05', strategy: 125, benchmark: 106 },
  { date: '02-10', strategy: 130, benchmark: 108 },
  { date: '02-15', strategy: 122, benchmark: 105 },
  { date: '02-20', strategy: 135, benchmark: 107 },
  { date: '03-01', strategy: 145, benchmark: 110 },
  { date: '03-10', strategy: 155, benchmark: 112 },
  { date: '03-20', strategy: 168, benchmark: 114 },
];

export const BacktestEval: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <header className="flex justify-between items-center bg-[#131313] border-b border-[#414755]/20 h-10 -mt-6 -mx-6 px-6 mb-6">
        <div className="flex gap-6">
          <button className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] text-sm py-2">概览 (OVERVIEW)</button>
          <button className="text-[#8b90a0] hover:text-[#e5e2e1] text-sm py-2 transition-colors">交易日志</button>
          <button className="text-[#8b90a0] hover:text-[#e5e2e1] text-sm py-2 transition-colors">归因分析</button>
        </div>
        <div className="flex gap-4 text-[#8b90a0]">
          <Zap className="w-4 h-4 cursor-pointer hover:text-[#adc6ff]" />
          <Settings className="w-4 h-4 cursor-pointer hover:text-[#adc6ff]" />
        </div>
      </header>

      {/* Main Chart Section */}
      <section className="bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#414755]/10 flex justify-between items-center bg-[#1c1b1b]/50">
          <div>
            <h3 className="text-xs font-black tracking-widest text-[#adc6ff] uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              收益曲线 (EQUITY CURVE)
            </h3>
            <p className="text-[10px] text-[#8b90a0] font-mono mt-1">综合增长率 vs 市场基准指数 (CNY)</p>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-[#131313] rounded-lg text-[10px] font-mono border border-[#414755]/20 text-[#adc6ff]">
              <span className="w-2 h-2 rounded-full bg-[#adc6ff] shadow-[0_0_8px_#adc6ff]" /> 策略 V2.4
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-[#131313] rounded-lg text-[10px] font-mono border border-[#414755]/20 text-[#8b90a0]">
              <span className="w-2 h-2 rounded-full bg-[#8b90a0]/30" /> 基准指数
            </span>
          </div>
        </div>
        <div className="h-80 w-full p-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPerformance}>
              <defs>
                <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#adc6ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#adc6ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#414755" opacity={0.1} />
              <XAxis dataKey="date" stroke="#8b90a0" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8b90a0" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #414755', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="strategy" stroke="#adc6ff" strokeWidth={3} fillOpacity={1} fill="url(#colorStrategy)" />
              <Line type="monotone" dataKey="benchmark" stroke="#8b90a0" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '累计收益', value: '+124.8%', sub: '净盈亏: ¥12,480', icon: TrendingUp, color: 'text-[#ffb4a9]' },
          { label: '年化收益', value: '32.4%', sub: '波动率: 14.2%', icon: Calendar, color: 'text-[#e5e2e1]' },
          { label: '夏普比率', value: '2.84', sub: '索提诺比率: 3.12', icon: Scale, color: 'text-[#adc6ff]' },
          { label: '最大回撤', value: '-8.4%', sub: '修复周期: 24天', icon: AlertTriangle, color: 'text-[#78dc77]' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#201f1f] p-5 rounded-2xl border border-[#414755]/10 flex flex-col justify-between group hover:border-[#adc6ff]/30 transition-all shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black tracking-widest text-[#8b90a0] uppercase">{kpi.label}</span>
              <kpi.icon className={cn("w-4 h-4", kpi.color)} />
            </div>
            <div className="mt-4">
              <div className={cn("text-3xl font-black font-mono tracking-tighter", kpi.color)}>{kpi.value}</div>
              <div className="text-[10px] text-[#8b90a0] mt-1 font-mono">{kpi.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Winners and Losers Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Winners */}
        <div className="bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-sm">
          <div className="p-4 bg-[#1c1b1b]/50 border-b border-[#414755]/10 flex justify-between items-center">
            <h3 className="text-xs font-black tracking-widest text-[#e5e2e1] uppercase">收益核心来源 (TOP WINNERS)</h3>
            <span className="text-[10px] text-[#ffb4a9] font-black">+ POSITION ALPHA</span>
          </div>
          <div className="p-2 space-y-1">
            {[
              { pair: 'BTC/USDT', type: '做多', date: '2023-11-24', profit: '+$1,450', percent: '+14.2%' },
              { pair: 'ETH/USDT', type: '做多', date: '2023-12-02', profit: '+$820', percent: '+9.8%' },
            ].map((trade) => (
              <div key={trade.pair} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#353534] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb4a9]/10 flex items-center justify-center text-[#ffb4a9]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black font-mono text-[#e5e2e1]">{trade.pair}</div>
                    <div className="text-[10px] text-[#8b90a0] font-bold uppercase tracking-tighter">{trade.type} • {trade.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#ffb4a9] font-mono">{trade.profit}</div>
                  <div className="text-[10px] text-[#8b90a0] font-bold">{trade.percent}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Breakdown */}
        <div className="bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-sm">
          <div className="p-4 bg-[#1c1b1b]/50 border-b border-[#414755]/10 flex justify-between items-center">
            <h3 className="text-xs font-black tracking-widest text-[#e5e2e1] uppercase">系统性指标 (STATISTICS)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#414755]/10 text-[#8b90a0]">
                  <th className="px-6 py-4 font-black tracking-widest uppercase text-[10px]">性能维度</th>
                  <th className="px-4 py-4 font-black tracking-widest uppercase text-[10px]">策略数值</th>
                  <th className="px-4 py-4 font-black tracking-widest uppercase text-[10px]">基准差距</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#414755]/5">
                {[
                  { name: '胜率 (Win Rate)', val: '64.2%', diff: '+13.2%', active: true },
                  { name: '获利因子 (Profit Factor)', val: '1.82', diff: '+0.72', active: false },
                  { name: '平均持仓时长', val: '4.2h', diff: '-21%', active: false },
                  { name: '单笔最大收益', val: '14.2%', diff: 'N/A', active: false },
                ].map((stat) => (
                  <tr key={stat.name} className="hover:bg-[#353534] transition-colors group">
                    <td className="px-6 py-4 text-[#c1c6d7] font-medium">{stat.name}</td>
                    <td className={cn("px-4 py-4 font-black font-mono", stat.active ? "text-[#ffb4a9]" : "text-[#e5e2e1]")}>{stat.val}</td>
                    <td className="px-4 py-4">
                      {stat.diff.startsWith('+') ? (
                        <span className="flex items-center gap-1 text-[#ffb4a9] font-bold"><ArrowUpRight className="w-3 h-3" /> {stat.diff}</span>
                      ) : (
                        <span className="text-[#8b90a0] font-medium">{stat.diff}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
