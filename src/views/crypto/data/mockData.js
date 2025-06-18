// Mock data for crypto trading pairs
export const mockTradePairs = [
  {
    id: 1,
    name: 'BTC/USDT',
    active: true,
    minAmount: 100,
    maxAmount: 10000,
    currentRate: {
      buy: 42150.50,
      sell: 42350.75
    },
    volume24h: 125.45,
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    id: 2,
    name: 'ETH/USDT',
    active: true,
    minAmount: 50,
    maxAmount: 5000,
    currentRate: {
      buy: 2250.25,
      sell: 2275.50
    },
    volume24h: 1250.75,
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    id: 3,
    name: 'BNB/USDT',
    active: false,
    minAmount: 25,
    maxAmount: 2500,
    currentRate: {
      buy: 245.50,
      sell: 247.75
    },
    volume24h: 450.25,
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    id: 4,
    name: 'SOL/USDT',
    active: true,
    minAmount: 10,
    maxAmount: 1000,
    currentRate: {
      buy: 55.25,
      sell: 56.50
    },
    volume24h: 7500.50,
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    id: 5,
    name: 'XRP/USDT',
    active: true,
    minAmount: 100,
    maxAmount: 10000,
    currentRate: {
      buy: 0.65,
      sell: 0.67
    },
    volume24h: 125000.75,
    lastUpdated: '2023-11-20T14:30:00Z'
  }
];

// Mock data for wallet balances
export const mockWalletBalances = [
  {
    currency: 'BTC',
    amount: '12.5432',
    usdValue: 528432.15,
    status: 'healthy',
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    currency: 'ETH',
    amount: '150.7523',
    usdValue: 339191.42,
    status: 'healthy',
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    currency: 'USDT',
    amount: '1250000.00',
    usdValue: 1250000.00,
    status: 'healthy',
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    currency: 'BNB',
    amount: '500.25',
    usdValue: 122811.38,
    status: 'warning',
    lastUpdated: '2023-11-20T14:30:00Z'
  },
  {
    currency: 'SOL',
    amount: '2500.75',
    usdValue: 138166.44,
    status: 'healthy',
    lastUpdated: '2023-11-20T14:30:00Z'
  }
];

// Status colors for UI consistency
export const statusColors = {
  healthy: 'success',
  warning: 'warning',
  critical: 'error'
};

// Mock withdrawal approval status
export const mockWithdrawalStatus = {
  pending: 'pending',
  firstApproval: 'first_approval',
  completed: 'completed',
  rejected: 'rejected'
};

// Mock admin list for withdrawal approvals
export const mockAdmins = [
  {
    id: 1,
    username: 'admin1',
    role: 'super_admin',
    lastActive: '2023-11-20T14:25:00Z'
  },
  {
    id: 2,
    username: 'admin2',
    role: 'admin',
    lastActive: '2023-11-20T14:28:00Z'
  }
];

// Mock data for rate management
export const mockRates = {
  BTC: {
    buy: 42150.50,
    sell: 42350.75,
    autoSync: true,
    lastUpdated: '2023-11-20T14:30:00Z',
    provider: 'Binance'
  },
  ETH: {
    buy: 2250.25,
    sell: 2275.50,
    autoSync: true,
    lastUpdated: '2023-11-20T14:30:00Z',
    provider: 'Binance'
  },
  BNB: {
    buy: 245.50,
    sell: 247.75,
    autoSync: false,
    lastUpdated: '2023-11-20T14:30:00Z',
    provider: 'Manual'
  },
  SOL: {
    buy: 55.25,
    sell: 56.50,
    autoSync: true,
    lastUpdated: '2023-11-20T14:30:00Z',
    provider: 'Binance'
  },
  XRP: {
    buy: 0.65,
    sell: 0.67,
    autoSync: true,
    lastUpdated: '2023-11-20T14:30:00Z',
    provider: 'Binance'
  }
};

// Mock data for manual withdrawals
export const mockWithdrawals = [
  {
    id: 'W001',
    currency: 'BTC',
    amount: '1.5000',
    address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    reason: 'Emergency withdrawal request',
    status: 'pending',
    requestedBy: {
      id: 1,
      username: 'admin1',
      timestamp: '2023-11-20T14:25:00Z'
    },
    approvals: [],
    created_at: '2023-11-20T14:25:00Z'
  },
  {
    id: 'W002',
    currency: 'ETH',
    amount: '25.0000',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    reason: 'System maintenance',
    status: 'first_approval',
    requestedBy: {
      id: 2,
      username: 'admin2',
      timestamp: '2023-11-20T13:15:00Z'
    },
    approvals: [
      {
        adminId: 1,
        username: 'admin1',
        timestamp: '2023-11-20T13:20:00Z'
      }
    ],
    created_at: '2023-11-20T13:15:00Z'
  },
  {
    id: 'W003',
    currency: 'USDT',
    amount: '50000.0000',
    address: 'TXmVthAbdZnQHjhUhqx8kYUgbmBVoLgXvP',
    reason: 'Hot wallet rebalancing',
    status: 'completed',
    requestedBy: {
      id: 1,
      username: 'admin1',
      timestamp: '2023-11-20T12:00:00Z'
    },
    approvals: [
      {
        adminId: 1,
        username: 'admin1',
        timestamp: '2023-11-20T12:05:00Z'
      },
      {
        adminId: 2,
        username: 'admin2',
        timestamp: '2023-11-20T12:10:00Z'
      }
    ],
    created_at: '2023-11-20T12:00:00Z'
  }
];

// Mock withdrawal limits
export const mockWithdrawalLimits = {
  BTC: {
    min: 0.001,
    max: 5.0,
    dailyLimit: 10.0
  },
  ETH: {
    min: 0.01,
    max: 100.0,
    dailyLimit: 200.0
  },
  USDT: {
    min: 100,
    max: 100000,
    dailyLimit: 500000
  },
  BNB: {
    min: 0.1,
    max: 1000,
    dailyLimit: 2000
  },
  SOL: {
    min: 1,
    max: 10000,
    dailyLimit: 20000
  }
};