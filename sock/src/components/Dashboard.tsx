import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Star, 
  MoreHorizontal, 
  Filter, 
  RefreshCw, 
  Zap, 
  Square, 
  Play, 
  CreditCard 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MarketIndex, WatchlistItem, StrategyCard, AccountMetrics, TradeOrder } from '../types';

const mockIndices: MarketIndex[] = [
  { name: '上证指数', value: 3052.41, change: 1.24, isUp: true },
  { name: '创业板指', value: 1782.55, change: 0.85, isUp: false },
];

const mockWatchlist: WatchlistItem[] = [
  { code: '600519', name: '贵州茅台', price: 1685.20, change: 0.45, isUp: true },
  { code: '000001', name: '平安银行', price: 10.42, change: 1.12, isUp: false },
  { code: '300750', name: '宁德时代', price: 192.40, change: 2.31, isUp: true },
  { code: '601318', name: '中国平安', price: 39.15, change: 0.24, isUp: false },
];

const mockStrategies: StrategyCard[] = [
  { 
    id: '1', 
    name: '均值回归策略 V2.4', 
    status: 'active', 
    metrics: { sharpe: 2.41, winRate: 64.2, profit: 12840.50 },
    config: '监控标的: 沪深300 | 运行周期: 15m'
  },
  { 
    id: '2', 
    name: '双均线突破趋势', 
    status: 'stopped', 
    metrics: { sharpe: 1.18, winRate: 48.9, profit: -3412.00 },
    config: '监控标的: 纳斯达克100 | 运行周期: 1h'
  },
  { 
    id: '3', 
    name: '多因子Alpha对冲', 
    status: 'active', 
    metrics: { sharpe: 3.05, winRate: 71.0, profit: 45190.22 },
    config: '监控标的: 中证500 | 运行周期: 日线'
  },
];

const mockAccount: AccountMetrics = {
  totalAssets: 2485921.40,
  availableFunds: 542108.00,
  positionValue: 1943813.40,
  dailyPnL: 18402.15,
};

const mockOrders: TradeOrder[] = [
  { id: '1', name: '贵州茅台', type: 'buy', price: 1680.00, amount: 100, status: 'pending' },
  { id: '2', name: '宁德时代', type: 'sell', price: 195.50, amount: 500, status: 'pending' },
  { id: '3', name: '招商银行', type: 'buy', price: 32.15, amount: 2000, status: 'canceled' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-12 gap-6 h-full content-start">
      {/* Column 1: Market Indices & Watchlist */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          {mockIndices.map((index) => (
            <div key={index.name} className="bg-[#201f1f] p-4 rounded-xl border border-[#414755]/10 shadow-sm transition-transform hover:scale-[1.02]">
              <p className="text-[10px] text-[#8b90a0] font-bold uppercase tracking-wider mb-1">{index.name}</p>
              <p className={cn("text-xl font-mono font-bold", index.isUp ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                {index.value.toLocaleString()}
              </p>
              <div className={cn("text-xs flex items-center gap-1 font-medium", index.isUp ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                {index.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {index.isUp ? "+" : ""}{index.change}%
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#201f1f] rounded-xl border border-[#414755]/10 flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#414755]/10 flex justify-between items-center group cursor-pointer">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 text-[#adc6ff] fill-[#adc6ff]" />
              自选股
            </h3>
            <MoreHorizontal className="w-4 h-4 text-[#8b90a0] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#1c1b1b]/50 text-[#8b90a0] uppercase tracking-tighter">
                <tr>
                  <th className="px-4 py-2 font-medium">代码/名称</th>
                  <th className="px-2 py-2 font-medium text-right">现价</th>
                  <th className="px-4 py-2 font-medium text-right">涨跌幅</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#414755]/5">
                {mockWatchlist.map((item) => (
                  <tr key={item.code} className="hover:bg-[#353534] transition-colors cursor-pointer group">
                    <td className="px-4 py-3">
                      <div className="font-bold text-[#e5e2e1]">{item.code}</div>
                      <div className="text-[10px] text-[#8b90a0]">{item.name}</div>
                    </td>
                    <td className={cn("px-2 py-3 text-right font-mono font-bold", item.isUp ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={cn("px-4 py-3 text-right font-bold", item.isUp ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                      {item.isUp ? "+" : ""}{item.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Column 2: Strategy Matrix */}
      <div className="col-span-12 lg:col-span-5 flex flex-col">
        <div className="bg-[#201f1f] rounded-xl border border-[#414755]/10 flex flex-col h-full shadow-sm">
          <div className="p-4 border-b border-[#414755]/10 flex justify-between items-center bg-[#2a2a2a]/30">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold tracking-tight">量化策略矩阵</h3>
              <span className="px-2 py-0.5 bg-[#adc6ff]/10 text-[#adc6ff] text-[10px] font-bold rounded-full">
                {mockStrategies.filter(s => s.status === 'active').length} ACTIVE
              </span>
            </div>
            <div className="flex gap-2 text-[#8b90a0]">
              <Filter className="w-4 h-4 cursor-pointer hover:text-[#adc6ff]" />
              <RefreshCw className="w-4 h-4 cursor-pointer hover:text-[#adc6ff]" />
            </div>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
            {mockStrategies.map((strategy) => (
              <div key={strategy.id} className="group bg-[#1c1b1b] p-4 rounded-xl border border-[#414755]/5 hover:border-[#adc6ff]/40 transition-all cursor-pointer shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#e5e2e1] group-hover:text-[#adc6ff] transition-colors">{strategy.name}</h4>
                      <span className={cn(
                        "flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                        strategy.status === 'active' ? "text-[#78dc77] bg-[#41a447]/20" : "text-[#8b90a0] bg-[#353534]"
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", strategy.status === 'active' ? "bg-[#78dc77] animate-pulse" : "bg-[#8b90a0]")}></span>
                        {strategy.status === 'active' ? "运行中" : "已停止"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8b90a0]">{strategy.config}</p>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-lg font-mono font-bold", strategy.metrics.profit >= 0 ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                      {strategy.metrics.profit >= 0 ? "+" : ""}¥{strategy.metrics.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-[#8b90a0] text-[10px] uppercase font-bold tracking-widest">累计盈亏</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-[#414755]/10 pt-4">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[#8b90a0] text-[10px] font-bold tracking-wider">夏普比率</p>
                      <p className="text-[#e5e2e1] text-xs font-mono font-bold">{strategy.metrics.sharpe}</p>
                    </div>
                    <div>
                      <p className="text-[#8b90a0] text-[10px] font-bold tracking-wider">胜率</p>
                      <p className="text-[#e5e2e1] text-xs font-mono font-bold">{strategy.metrics.winRate}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-1.5 text-[11px] bg-[#353534] text-[#e5e2e1] rounded-lg font-bold hover:bg-[#414755] transition-colors">编辑</button>
                    {strategy.status === 'active' ? (
                       <button className="px-4 py-1.5 text-[11px] bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/30 rounded-lg font-bold hover:bg-[#adc6ff] hover:text-[#002e69] transition-all">复位</button>
                    ) : (
                      <button className="px-4 py-1.5 text-[11px] bg-[#adc6ff] text-[#002e69] rounded-lg font-bold hover:brightness-110 transition-all">启动</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 3: Account Info & Orders */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-[#201f1f] p-6 rounded-xl border border-[#414755]/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#adc6ff]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#adc6ff]/10 transition-colors" />
          <div className="flex items-center gap-2 mb-8">
            <CreditCard className="w-5 h-5 text-[#adc6ff]" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#adc6ff]">资产核心指标</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
            <div>
              <p className="text-[#8b90a0] text-[10px] uppercase font-bold tracking-widest mb-1">总资产 (CNY)</p>
              <p className="text-[#e5e2e1] text-2xl font-mono font-black break-all leading-none">{mockAccount.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#8b90a0] text-[10px] uppercase font-bold tracking-widest mb-1">可用资金</p>
              <p className="text-[#e5e2e1] text-2xl font-mono font-bold break-all leading-none">{mockAccount.availableFunds.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#8b90a0] text-[10px] uppercase font-bold tracking-widest mb-1">持仓市值</p>
              <p className="text-[#e5e2e1] text-lg font-mono font-bold">{mockAccount.positionValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#8b90a0] text-[10px] uppercase font-bold tracking-widest mb-1">当日盈亏</p>
              <p className="text-[#ffb4a9] text-lg font-mono font-bold">+{mockAccount.dailyPnL.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 bg-[#353534] text-[#e5e2e1] rounded-lg text-xs font-bold border border-[#414755]/20 hover:bg-[#414755] transition-all">充值/划转</button>
            <button className="py-2.5 bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/20 rounded-lg text-xs font-bold hover:bg-[#adc6ff]/20 transition-all">导出账单</button>
          </div>
        </div>

        <div className="bg-[#201f1f] rounded-xl border border-[#414755]/10 flex flex-col flex-1 overflow-hidden shadow-sm">
          <div className="flex border-b border-[#414755]/10">
            <button className="flex-1 px-4 py-3 text-xs font-bold text-[#adc6ff] border-b-2 border-[#adc6ff] bg-[#adc6ff]/5">委托中交易</button>
            <button className="flex-1 px-4 py-3 text-xs font-bold text-[#8b90a0] hover:text-[#e5e2e1] transition-colors">最近成交</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#1c1b1b]/50 text-[#8b90a0] uppercase tracking-tighter">
                <tr>
                  <th className="px-4 py-2 font-medium">标的/类型</th>
                  <th className="px-2 py-2 font-medium text-right">价格</th>
                  <th className="px-4 py-2 font-medium text-right">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#414755]/5">
                {mockOrders.map((order) => (
                  <tr key={order.id} className={cn("hover:bg-[#353534] transition-colors", order.status === 'canceled' && "opacity-50")}>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[#e5e2e1]">{order.name}</div>
                      <div className="flex items-center gap-1">
                        <span className={cn("text-[10px] font-bold", order.type === 'buy' ? "text-[#ffb4a9]" : "text-[#78dc77]")}>
                          {order.type === 'buy' ? "限价买入" : "止盈卖出"}
                        </span>
                        <span className="text-[#8b90a0] text-[10px]">{order.amount}股</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-right font-mono font-bold text-[#e5e2e1]">
                      {order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {order.status === 'pending' ? (
                        <span className="text-[#adc6ff] text-[10px] bg-[#adc6ff]/10 px-2 py-0.5 rounded-full font-bold">排队中</span>
                      ) : (
                        <span className="text-[#8b90a0] text-[10px] bg-[#353534] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">已撤单</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
