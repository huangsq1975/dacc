/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserCircle, 
  Code2, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Clock, 
  Plus, 
  Bell, 
  Settings, 
  HelpCircle,
  Search,
  Wallet,
  Menu,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ViewId } from './types';

import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { BacktestConfig } from './components/BacktestConfig';
import { BacktestEval } from './components/BacktestEval';
import { Portfolio } from './components/Portfolio';
import { History } from './components/History';

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');

  const navItems = [
    { id: 'dashboard', label: '账户中心', icon: UserCircle },
    { id: 'editor', label: '策略编辑器', icon: Code2 },
    { id: 'backtest-config', label: '回测配置', icon: Settings },
    { id: 'backtest-eval', label: '回测评估', icon: TrendingUp },
    { id: 'portfolio', label: '持仓分析', icon: PieChart },
    { id: 'history', label: '交易历史', icon: Clock },
    { id: 'realtime-data', label: '實時數據', icon: BarChart3 },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'editor': return <Editor />;
      case 'backtest-config': return <BacktestConfig />;
      case 'backtest-eval': return <BacktestEval />;
      case 'portfolio': return <Portfolio />;
      case 'history': return <History />;
      case 'realtime-data':
        return (
          <iframe
            src="/index_stock.html"
            title="實時數據"
            className="w-full h-[calc(100vh-4rem)] border-0 bg-white"
          />
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#131313] text-[#e5e2e1] font-sans overflow-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1c1b1b] border-b border-[#414755]/20 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#adc6ff] rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#002e69]" />
            </div>
            <span className="font-bold tracking-tight text-lg">QUANTCORE</span>
          </div>
          <nav className="flex gap-8">
            {['交易终端', '策略回测', '账户中心', '风险管理'].map((item) => (
              <button 
                key={item}
                className={cn(
                  "text-xs uppercase tracking-wider transition-colors pb-1 border-b-2 border-transparent",
                  item === '账户中心' ? "text-[#adc6ff] border-[#adc6ff]" : "text-[#8b90a0] hover:text-[#e5e2e1]"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[#8b90a0]">
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#adc6ff] transition-colors" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-[#adc6ff] transition-colors" />
            <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#adc6ff] transition-colors" />
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-[#414755]/40">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold">TRADER_ALPHA</p>
              <p className="text-[10px] text-[#78dc77] font-mono">LVL. 4 QUANTEER</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&auto=format&fit=crop" 
              alt="User" 
              className="w-8 h-8 rounded-full border border-[#adc6ff]/30 ring-2 ring-black/50"
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#131313] border-r border-[#414755]/20 flex flex-col pt-6 z-40 transform transition-transform">
        <div className="px-6 mb-8 px-4">
          <div className="flex items-center gap-3 p-3 bg-[#201f1f] rounded-xl border border-[#414755]/10">
            <div className="w-10 h-10 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#adc6ff]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#e5e2e1]">实盘账户</p>
              <p className="text-[10px] text-[#8b90a0] font-mono tracking-tighter">ID: 8829410</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewId)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeView === item.id 
                  ? "bg-[#353534] text-[#adc6ff] shadow-sm" 
                  : "text-[#8b90a0] hover:bg-[#353534]/50 hover:text-[#e5e2e1]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                activeView === item.id ? "text-[#adc6ff]" : "text-[#8b90a0] group-hover:text-[#adc6ff]"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
              {activeView === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto w-1 h-5 bg-[#adc6ff] rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button className="w-full flex items-center justify-center gap-2 bg-[#adc6ff] text-[#002e69] py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#adc6ff]/10 hover:brightness-110 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            新建策略
          </button>
        </div>

        <div className="mt-auto border-t border-[#414755]/10 p-4">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#8b90a0]">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#78dc77] animate-pulse" />
              SYSTEM OK
            </span>
            <span className="font-mono">v2.4.1</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 mt-16 flex-1 relative overflow-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
