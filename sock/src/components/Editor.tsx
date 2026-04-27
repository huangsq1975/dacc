import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Hammer, 
  X, 
  Terminal as TerminalIcon,
  Sparkles,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from '@google/genai';

const mockFiles = [
  { name: '策略', type: 'folder', children: [
    { name: '均值回归.py', type: 'file', active: true },
    { name: '突破策略.py', type: 'file' },
    { name: '高频交易机器人.py', type: 'file' },
  ]},
  { name: '指标', type: 'folder', children: [] },
];

export const Editor: React.FC = () => {
  const [activeFile, setActiveFile] = useState('均值回归.py');
  const [chatInput, setChatInput] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'user', content: '如何优化该策略以在波动剧烈期间减少最大回撤？' },
    { role: 'ai', content: '为在高波动环境中减少回撤，请考虑实施 自适应窗口。您可以不使用固定的 20 周期 SMA，而是使用 波动率调节窗口（例如基于 ATR）。\n\n需要我为您生成基于 ATR 的退出条件代码片段吗？' }
  ]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, content: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const prompt = `You are an expert quantitative trading assistant. The user is asking about their strategy: "${chatInput}". 
      Current strategy code is a Mean Reversion strategy. 
      Provide a concise, professional answer with actionable tips or code snippets. Keep it short.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      const text = response.text ?? '未获取到回复。';
      
      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', content: '抱歉，我现在无法处理您的请求。请稍后再试。' }]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* File Explorer */}
      <aside className="w-64 bg-[#1c1b1b]/50 border-r border-[#414755]/20 flex flex-col shrink-0">
        <div className="px-4 h-10 flex items-center justify-between border-b border-[#414755]/10 bg-[#131313]/30">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b90a0]">资源管理器</span>
          <MoreHorizontal className="w-4 h-4 text-[#8b90a0] cursor-pointer hover:text-white" />
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {mockFiles.map((folder) => (
            <div key={folder.name}>
              <div className="flex items-center gap-2 py-1.5 px-2 text-[#e5e2e1] hover:bg-[#353534] rounded-lg cursor-pointer group">
                <ChevronDown className="w-3.5 h-3.5 text-[#8b90a0]" />
                <Folder className="w-4 h-4 text-[#adc6ff]" />
                <span className="text-xs font-medium">{folder.name}</span>
              </div>
              <div className="pl-6 space-y-0.5 mt-0.5">
                {folder.children.map((file) => (
                  <div 
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={cn(
                      "flex items-center gap-2 py-1.5 px-3 rounded-lg cursor-pointer transition-all",
                      activeFile === file.name 
                        ? "bg-[#adc6ff]/10 text-[#adc6ff] border-l-2 border-[#adc6ff]" 
                        : "text-[#8b90a0] hover:bg-[#353534] hover:text-[#e5e2e1]"
                    )}
                  >
                    <FileCode className={cn("w-4 h-4", activeFile === file.name ? "text-[#adc6ff]" : "text-[#8b90a0]")} />
                    <span className="text-xs">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Editor Console */}
      <section className="flex-1 flex flex-col bg-[#131313] relative">
        <div className="h-10 bg-[#0e0e0e] flex items-center justify-between px-2 shrink-0 border-b border-[#414755]/10">
          <div className="flex h-full">
            <div className="flex items-center gap-2 px-4 bg-[#131313] border-t-2 border-[#adc6ff] text-xs font-medium text-[#e5e2e1] h-full shadow-sm">
              <TerminalIcon className="w-3 h-3 text-[#adc6ff]" />
              {activeFile}
              <X className="w-3 h-3 ml-1 text-[#8b90a0] hover:bg-[#353534] rounded cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-2 pr-2">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#41a447]/20 text-[#78dc77] text-[10px] font-black uppercase tracking-wider rounded-lg border border-[#41a447]/30 hover:brightness-110 transition-all shadow-sm">
              <Play className="w-3 h-3 fill-current" />
              运行
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#353534] text-[#e5e2e1] text-[10px] font-black uppercase tracking-wider rounded-lg border border-[#414755]/30 hover:bg-[#414755] transition-colors shadow-sm">
              <Hammer className="w-3 h-3" />
              编译
            </button>
          </div>
        </div>

        {/* Code Visual Area */}
        <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-auto custom-scrollbar bg-[#131313]">
          <div className="flex gap-4">
            <div className="text-[#8b90a0]/30 text-right select-none pr-4 border-r border-[#414755]/10">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="flex-1 text-[#c1c6d7] space-y-0.5">
              <p><span className="text-[#ffb4a9]">import</span> numpy <span className="text-[#ffb4a9]">as</span> np</p>
              <p><span className="text-[#ffb4a9]">from</span> quantcore.engine <span className="text-[#ffb4a9]">import</span> Strategy, Order</p>
              <p>&nbsp;</p>
              <p><span className="text-[#78dc77]">class</span> <span className="text-[#adc6ff]">MeanReversion</span>(Strategy):</p>
              <p className="pl-4"><span className="text-[#78dc77]">def</span> <span className="text-[#adc6ff]">on_init</span>(<span className="text-[#ffb4a9]">self</span>):</p>
              <p className="pl-8"><span className="text-[#ffb4a9]">self</span>.window = <span className="text-[#4b8eff]">20</span></p>
              <p className="pl-8"><span className="text-[#ffb4a9]">self</span>.std_dev = <span className="text-[#4b8eff]">2.5</span></p>
              <p>&nbsp;</p>
              <p className="pl-4"><span className="text-[#78dc77]">def</span> <span className="text-[#adc6ff]">on_data</span>(<span className="text-[#ffb4a9]">self</span>, data):</p>
              <p className="pl-8">prices = data.get_recent_prices(<span className="text-[#ffb4a9]">self</span>.window)</p>
              <p className="pl-8">sma = np.mean(prices)</p>
              <p className="pl-8">std = np.std(prices)</p>
              <p>&nbsp;</p>
              <p className="pl-8">upper_band = sma + (<span className="text-[#ffb4a9]">self</span>.std_dev * std)</p>
              <p className="pl-8">lower_band = sma - (<span className="text-[#ffb4a9]">self</span>.std_dev * std)</p>
              <p>&nbsp;</p>
              <p className="pl-8"><span className="text-[#ffb4a9]">if</span> prices[-<span className="text-[#4b8eff]">1</span>] &gt; upper_band:</p>
              <p className="pl-12"><span className="text-[#ffb4a9]">self</span>.sell(Order.MARKET, amount=<span className="text-[#4b8eff]">100</span>)</p>
              <p className="pl-8"><span className="text-[#ffb4a9]">elif</span> prices[-<span className="text-[#4b8eff]">1</span>] &lt; lower_band:</p>
              <p className="pl-12"><span className="text-[#ffb4a9]">self</span>.buy(Order.MARKET, amount=<span className="text-[#4b8eff]">100</span>)</p>
            </div>
          </div>
        </div>

        {/* Floating Terminal Output */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-6 right-6 left-6 h-40 bg-[#0e0e0e]/95 backdrop-blur-md border border-[#414755]/30 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-20"
            >
              <div className="px-4 h-9 flex items-center justify-between border-b border-[#414755]/10 bg-[#1c1b1b]/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8b90a0]">终端输出 - TERMINAL OUTPUT</span>
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4a9] opacity-40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#78dc77] opacity-40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#adc6ff] opacity-40"></span>
                </div>
              </div>
              <div className="p-4 font-mono text-xs text-[#78dc77]/80 h-full overflow-y-auto space-y-1">
                <p>&gt; 编译成功: MeanReversion 策略已初始化。</p>
                <p className="text-[#ffb4a9]">&gt; 警告: 变量 'window' 已定义但未在全局作用域中使用。</p>
                <p>&gt; 连接: 0.2ms 延迟，连接已建立。</p>
                <p className="animate-pulse">_</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* AI Assistant Sidebar */}
      <aside className="w-80 bg-[#1c1b1b] border-l border-[#414755]/20 flex flex-col shrink-0 shadow-2xl">
        <div className="px-4 h-10 flex items-center gap-2 border-b border-[#414755]/10 bg-[#131313]/30">
          <Sparkles className="w-4 h-4 text-[#adc6ff]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e5e2e1]">AI 助手 - QUANT COPILOT</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={cn(
              "max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "self-end bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#e5e2e1] rounded-tr-none" 
                : "self-start bg-[#353534] border border-[#414755]/10 text-[#c1c6d7] rounded-tl-none"
            )}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[#414755]/10 bg-[#131313]/30">
          <div className="relative group">
            <textarea 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full bg-[#0e0e0e] border border-[#414755]/30 rounded-xl p-3 pb-10 text-xs text-[#e5e2e1] focus:outline-none focus:border-[#adc6ff]/50 placeholder:text-[#8b90a0]/30 resize-none transition-all shadow-inner" 
              placeholder="询问 AI 关于您的策略..." 
              rows={3} 
            />
            <button 
              onClick={handleSendMessage}
              className="absolute bottom-2 right-2 p-2 bg-[#adc6ff] text-[#002e69] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button className="text-[9px] font-bold uppercase tracking-widest bg-[#353534] border border-[#414755]/20 px-2 py-1 rounded-md text-[#8b90a0] hover:text-[#adc6ff] transition-colors">应用 ATR 退出</button>
            <button className="text-[9px] font-bold uppercase tracking-widest bg-[#353534] border border-[#414755]/20 px-2 py-1 rounded-md text-[#8b90a0] hover:text-[#adc6ff] transition-colors">解释 ATR</button>
          </div>
        </div>
      </aside>
    </div>
  );
};
