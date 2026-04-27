export type ViewId = 'dashboard' | 'editor' | 'backtest-config' | 'backtest-eval' | 'portfolio' | 'history' | 'realtime-data';

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  isUp: boolean;
}

export interface WatchlistItem {
  code: string;
  name: string;
  price: number;
  change: number;
  isUp: boolean;
}

export interface StrategyCard {
  id: string;
  name: string;
  status: 'active' | 'stopped' | 'backtesting';
  metrics: {
    sharpe: number;
    winRate: number;
    profit: number;
  };
  config: string;
}

export interface AccountMetrics {
  totalAssets: number;
  availableFunds: number;
  positionValue: number;
  dailyPnL: number;
}

export interface TradeOrder {
  id: string;
  name: string;
  type: 'buy' | 'sell';
  price: number;
  status: 'pending' | 'canceled' | 'filled';
  amount: number;
}

export interface PerformanceSnapshot {
  date: string;
  strategy: number;
  benchmark: number;
}
