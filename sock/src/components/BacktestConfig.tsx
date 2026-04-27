import React from 'react';
import { 
  Calendar, 
  Globe, 
  Settings2, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Save, 
  Activity,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const mockPreviewData = [
  { name: '科技', value: 80, color: '#adc6ff' },
  { name: '金融', value: 65, color: '#ffb4a9' },
  { name: '能源', value: 45, color: '#78dc77' },
  { name: '消费', value: 70, color: '#adc6ff' },
  { name: '医药', value: 55, color: '#ffb4a9' },
  { name: '工业', value: 60, color: '#adc6ff' },
  { name: '通讯', value: 40, color: '#78dc77' },
];

export const BacktestConfig: React.FC = () => {
  return (
    <div className="p-6 flex flex-col space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Basic Settings */}
        <div className="col-span-12 lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-[#201f1f] p-6 rounded-2xl border border-[#414755]/10 shadow-sm transition-all hover:bg-[#201f1f]/80">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-[#e5e2e1] flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#adc6ff]" />
                时间范围与资产
              </h2>
              <span className="text-[10px] font-mono text-[#8b90a0] uppercase tracking-widest bg-[#131313] px-2 py-1 rounded">CONFIG_V2.4</span>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">开始日期</label>
                  <div className="bg-[#0e0e0e] border border-[#414755]/30 rounded-lg px-4 py-2.5 flex items-center justify-between group focus-within:border-[#adc6ff]/50 transition-all">
                    <input type="text" value="2020-01-01" className="bg-transparent border-none p-0 text-sm font-mono w-full text-[#e5e2e1] focus:ring-0" />
                    <Calendar className="w-4 h-4 text-[#8b90a0] group-hover:text-[#adc6ff]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">结束日期</label>
                  <div className="bg-[#0e0e0e] border border-[#414755]/30 rounded-lg px-4 py-2.5 flex items-center justify-between group focus-within:border-[#adc6ff]/50 transition-all">
                    <input type="text" value="2023-12-31" className="bg-transparent border-none p-0 text-sm font-mono w-full text-[#e5e2e1] focus:ring-0" />
                    <Calendar className="w-4 h-4 text-[#8b90a0] group-hover:text-[#adc6ff]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">初始资金 (USD)</label>
                <div className="bg-[#0e0e0e] border border-[#414755]/30 rounded-xl px-4 py-4 flex items-center group focus-within:border-[#adc6ff]/50 transition-all">
                  <DollarSign className="w-5 h-5 text-[#adc6ff] mr-2" />
                  <input type="text" value="1,000,000.00" className="bg-transparent border-none p-0 text-2xl font-mono font-black text-[#e5e2e1] focus:ring-0 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">回测频率</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1分', '5分', '1小时', '1天'].map((freq, i) => (
                    <button 
                      key={freq}
                      className={cn(
                        "text-[11px] font-bold py-2.5 rounded-lg border transition-all",
                        i === 0 
                          ? "bg-[#adc6ff] text-[#002e69] border-[#adc6ff] shadow-lg shadow-[#adc6ff]/10" 
                          : "bg-[#0e0e0e] text-[#8b90a0] border-[#414755]/20 hover:border-[#adc6ff]/40"
                      )}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#201f1f] p-6 rounded-2xl border border-[#414755]/10 shadow-sm flex flex-col space-y-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">引擎核心配置</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#1c1b1b] rounded-xl border border-[#414755]/10 hover:border-[#adc6ff]/30 cursor-pointer group transition-all">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#e5e2e1]">滑点模型 (Slippage)</span>
                  <span className="text-[10px] text-[#8b90a0] font-mono">线性冲击 (0.01%)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8b90a0] group-hover:text-[#adc6ff] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#1c1b1b] rounded-xl border border-[#414755]/10 hover:border-[#adc6ff]/30 cursor-pointer group transition-all">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#e5e2e1]">执行延迟 (Latency)</span>
                  <span className="text-[10px] text-[#8b90a0] font-mono">网络模拟 50ms</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8b90a0] group-hover:text-[#adc6ff] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Universe & Signal Weights */}
        <div className="col-span-12 lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-[#201f1f] p-6 rounded-2xl border border-[#414755]/10 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-[#e5e2e1] flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#adc6ff]" />
                标的池与信号量化
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">资产类别选择</label>
                <div className="bg-[#0e0e0e] rounded-xl border border-[#414755]/20 overflow-hidden divide-y divide-[#414755]/10">
                  {[
                    { name: '沪深 300 指数', active: true, color: '#ffb4a9' },
                    { name: '标普 500', active: false, color: '#8b90a0' },
                    { name: '纳斯达克 100', active: false, color: '#8b90a0' }
                  ].map((pool) => (
                    <div 
                      key={pool.name}
                      className={cn(
                        "p-4 flex items-center justify-between cursor-pointer transition-colors",
                        pool.active ? "bg-[#adc6ff]/5" : "hover:bg-[#adc6ff]/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", pool.active ? "bg-[#ffb4a9] shadow-[0_0_8px_#ffb4a9]" : "bg-[#414755]")} />
                        <span className={cn("text-sm font-medium", pool.active ? "text-[#e5e2e1]" : "text-[#8b90a0]")}>{pool.name}</span>
                      </div>
                      {pool.active && <CheckCircle2 className="w-4 h-4 text-[#adc6ff]" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0]">动态筛选策略</label>
                <div className="space-y-4">
                  <div className="bg-[#1c1b1b] p-4 rounded-xl border border-[#414755]/10 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-[#e5e2e1]">最小市值 (Market Cap)</span>
                      <span className="text-xs font-mono font-bold text-[#adc6ff]">$5B</span>
                    </div>
                    <div className="h-1.5 bg-[#0e0e0e] rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-[#adc6ff] rounded-full shadow-[0_0_10px_#adc6ff]" />
                    </div>
                  </div>
                  <div className="bg-[#1c1b1b] p-4 rounded-xl border border-[#414755]/10 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-[#e5e2e1]">日均成交额 (30D)</span>
                      <span className="text-xs font-mono font-bold text-[#adc6ff]">&gt; $10M</span>
                    </div>
                    <div className="h-1.5 bg-[#0e0e0e] rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-[#adc6ff] rounded-full shadow-[0_0_10px_#adc6ff]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#8b90a0] mb-4">核心信号权重系统</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: '动量因子', val: '0.45', active: true },
                  { label: '均值回归', val: '0.25', active: false },
                  { label: '低波动率', val: '0.30', active: false }
                ].map((input) => (
                  <div key={input.label} className="bg-[#0e0e0e] p-4 rounded-xl border border-[#414755]/20 focus-within:border-[#adc6ff]/40 transition-all">
                    <span className="text-[9px] uppercase font-black text-[#8b90a0] block mb-2">{input.label}</span>
                    <input type="text" value={input.val} className={cn("bg-transparent border-none p-0 text-xl font-mono font-bold focus:ring-0 w-full", input.active ? "text-[#adc6ff]" : "text-[#e5e2e1]")} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universe Preview Chart */}
      <div className="bg-[#201f1f] rounded-2xl border border-[#414755]/10 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#414755]/10 flex items-center justify-between bg-[#1c1b1b]/50">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8b90a0]">股票池成分热力预览</span>
            <div className="px-2 py-0.5 bg-[#78dc77]/10 text-[#78dc77] text-[9px] font-bold rounded border border-[#78dc77]/20 flex items-center gap-1">
              <Activity className="w-2 h-2" /> DATA READY
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold text-[#8b90a0]"><span className="w-2 h-2 bg-[#ffb4a9] rounded-full" /> 科技权重</span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-[#8b90a0]"><span className="w-2 h-2 bg-[#adc6ff] rounded-full" /> 金融权重</span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-[#8b90a0]"><span className="w-2 h-2 bg-[#78dc77] rounded-full" /> 能源权重</span>
          </div>
        </div>
        <div className="h-48 w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPreviewData}>
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {mockPreviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sticky Bottom Execution Bar */}
      <div className="fixed bottom-0 left-64 right-0 h-20 bg-[#131313]/90 backdrop-blur-md border-t border-[#414755]/30 px-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#8b90a0]">预计计算耗时</span>
            <span className="text-sm font-mono font-bold text-[#e5e2e1]">~42.48 s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#8b90a0]">总成交数据密度</span>
            <span className="text-sm font-mono font-bold text-[#e5e2e1]">1,200,000pts</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3 rounded-xl text-xs font-bold text-[#8b90a0] hover:text-[#e5e2e1] transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            保存当前预设
          </button>
          <button className="bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] text-[#002e69] px-10 py-3.5 rounded-xl font-black text-sm flex items-center gap-3 shadow-xl shadow-[#adc6ff]/10 hover:brightness-110 active:scale-95 transition-all">
            <Play className="w-5 h-5 fill-current" />
            运行系统回测
          </button>
        </div>
      </div>
    </div>
  );
};
