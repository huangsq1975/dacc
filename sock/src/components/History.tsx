import React from 'react';
import { 
  Search, 
  Calendar, 
  Filter, 
  Download, 
  Trash2, 
  X,
  FileCode,
  AlertCircle,
  CheckCircle2,
  Rocket
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockLogs = [
  { time: '2024-03-20 14:55:01', type: 'info', content: '策略触发 <span class="text-[#ffb4a9] font-bold">买入</span> 信号 <span class="text-[#adc6ff] font-bold">600519.SH</span> (贵州茅台) 价格 1712.50。订单已提交。' },
  { time: '2024-03-20 14:55:02', type: 'success', content: '600519.SH 订单全部成交，价格 1712.50。总金额: 342,500.00。' },
  { time: '2024-03-20 13:42:12', type: 'info', content: '策略触发 <span class="text-[#78dc77] font-bold">卖出</span> 信号 <span class="text-[#adc6ff] font-bold">300750.SZ</span> (宁德时代) 价格 190.45。逻辑: RSI 超买信号。' },
  { time: '2024-03-20 11:15:50', type: 'warn', content: '000001.SZ 订单由用户取消或系统超时。' },
  { time: '2024-03-20 09:30:00', type: 'system', content: 'QuantCore 引擎 v4.2.1 初始化。正在加载策略: [TrendFollow_v2]...' },
];

export const History: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Top Filter Area */}
      <section className="p-4 bg-[#1c1b1b] border-b border-[#414755]/20 flex flex-wrap items-center gap-4 z-10 shadow-md">
        <div className="flex items-center gap-3 bg-[#0e0e0e] px-4 py-2 rounded-xl border border-[#414755]/20 w-80 group focus-within:border-[#adc6ff]/50 transition-all shadow-inner">
          <Search className="w-4 h-4 text-[#8b90a0]" />
          <input 
            type="text" 
            placeholder="按证券代码、名称搜索..." 
            className="bg-transparent border-none focus:ring-0 text-xs w-full text-[#e5e2e1] p-0 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-[#0e0e0e] px-4 py-2 rounded-xl border border-[#414755]/20 cursor-pointer hover:bg-[#131313] transition-colors shadow-inner">
          <Calendar className="w-4 h-4 text-[#8b90a0]" />
          <span className="text-xs text-[#e5e2e1] font-mono">2024-03-01 至 2024-03-20</span>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8b90a0]">操作模型</span>
          <div className="flex bg-[#0e0e0e] rounded-lg p-1 border border-[#414755]/10">
            {['全部', '买入', '卖出'].map((o, i) => (
              <button 
                key={o}
                className={cn(
                  "px-4 py-1 text-[11px] font-bold rounded-md transition-all",
                  i === 0 ? "bg-[#adc6ff] text-[#002e69] shadow-sm" : "text-[#8b90a0] hover:text-[#e5e2e1]"
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <button className="ml-auto flex items-center gap-2 px-5 py-2 border border-[#414755]/30 rounded-xl text-xs font-bold text-[#8b90a0] hover:bg-[#353534] hover:text-[#e5e2e1] transition-all shadow-sm">
          <Download className="w-4 h-4" />
          导出 CSV
        </button>
      </section>

      {/* Main Trade Table Area */}
      <div className="flex-[2] overflow-auto custom-scrollbar bg-[#131313]">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-[#1c1b1b]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20">成交时间 (UTC+8)</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20">证券代码</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20">名称</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20">方向</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20 text-right">成交价</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20 text-right">数量</th>
              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20 text-right">总额</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#8b90a0] border-b border-[#414755]/20">执行状态</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[11px] divide-y divide-[#414755]/5">
            {[
              { time: '2024-03-20 14:55:01', code: '600519.SH', name: '贵州茅台', side: '买入', price: '1,712.50', qty: '200', total: '342,500.00', status: 'filled', up: true },
              { time: '2024-03-20 13:42:12', code: '300750.SZ', name: '宁德时代', side: '卖出', price: '190.45', qty: '1,200', total: '228,540.00', status: 'filled', up: false },
              { time: '2024-03-20 11:15:45', code: '000001.SZ', name: '平安银行', side: '买入', price: '10.65', qty: '10,000', total: '106,500.00', status: 'canceled', up: true },
              { time: '2024-03-20 10:30:11', code: '601318.SH', name: '中国平安', side: '卖出', price: '42.18', qty: '5,000', total: '210,900.00', status: 'filled', up: false },
            ].map((trade, i) => (
              <tr key={i} className="hover:bg-[#353534]/30 transition-colors cursor-pointer group">
                <td className="px-6 py-4 text-[#8b90a0]">{trade.time}</td>
                <td className="px-4 py-4 text-[#adc6ff] font-black">{trade.code}</td>
                <td className="px-4 py-4 text-[#e5e2e1] font-sans font-bold">{trade.name}</td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black border",
                    trade.side === '买入' ? "bg-[#ffb4a9]/10 text-[#ffb4a9] border-[#ffb4a9]/20" : "bg-[#78dc77]/10 text-[#78dc77] border-[#78dc77]/20"
                  )}>
                    {trade.side}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-black text-[#e5e2e1]">{trade.price}</td>
                <td className="px-4 py-4 text-right text-[#c1c6d7]">{trade.qty}</td>
                <td className="px-4 py-4 text-right font-black text-[#e5e2e1]">{trade.total}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", trade.status === 'filled' ? "bg-[#78dc77]" : "bg-[#8b90a0]")} />
                    <span className={cn("font-black tracking-tighter uppercase", trade.status === 'filled' ? "text-[#78dc77]" : "text-[#8b90a0]")}>
                      {trade.status === 'filled' ? 'Executed' : 'Canceled'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategy Run Log Panel */}
      <div className="flex-1 flex flex-col border-t border-[#414755]/30">
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#1c1b1b] border-b border-[#414755]/10">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#adc6ff]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e5e2e1]">策略运行日志 (STRATEGY RUN LOG)</span>
          </div>
          <div className="flex items-center gap-4">
            <Trash2 className="w-4 h-4 text-[#8b90a0] cursor-pointer hover:text-[#ffb4a9] transition-colors" />
            <X className="w-4 h-4 text-[#8b90a0] cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
        <div className="flex-1 bg-[#0e0e0e] p-6 overflow-y-auto custom-scrollbar font-mono text-[11px] leading-[1.8] select-text">
          {mockLogs.map((log, i) => (
            <div key={i} className="flex gap-4 group">
              <span className="text-[#8b90a0] shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">[{log.time}]</span>
              <span className={cn(
                "font-black uppercase tracking-tighter shrink-0",
                log.type === 'info' ? "text-[#adc6ff]" : 
                log.type === 'success' ? "text-[#78dc77]" : 
                log.type === 'warn' ? "text-[#ffb4a9]" : "text-[#4b8eff]"
              )}>
                {log.type === 'system' ? 'SYSTEM' : log.type.toUpperCase()}:
              </span>
              <span 
                className="text-[#c1c6d7]" 
                dangerouslySetInnerHTML={{ __html: log.content }} 
              />
            </div>
          ))}
          <div className="animate-pulse w-1.5 h-3 bg-[#adc6ff]/50 mt-2" />
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="h-10 bg-[#0e0e0e] border-t border-[#414755]/20 flex items-center justify-between px-6 shrink-0 relative z-20">
        <div className="flex items-center gap-8 text-[10px] font-mono font-bold uppercase tracking-widest">
           <span className="text-[#8b90a0]">© 2026 QUANTCORE | MATRIX v2.0.4</span>
           <div className="flex items-center gap-6">
              <span className="text-[#78dc77]">成交总额: ¥1,482,901.55</span>
              <span className="text-[#78dc77]">执行次数: 142</span>
           </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-[#8b90a0]">
          <span className="flex items-center gap-1.5"><Rocket className="w-3 h-3 text-[#adc6ff]" /> ENGINE: ACTIVE</span>
          <span>LATENCY: 2ms</span>
        </div>
      </footer>
    </div>
  );
};
