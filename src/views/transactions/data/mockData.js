// Mock data for transactions
export const mockTransactions = [
  {
    id: 'TRX-001',
    date: '2023-11-20T09:30:00Z',
    type: 'crypto',
    status: 'completed',
    amount: '0.5 BTC',
    user: {
      id: 1,
      username: 'johndoe',
      email: 'john.doe@example.com'
    },
    evidence: 'https://example.com/evidence/001.jpg',
    tradeHistory: [
      { id: 1, type: 'Buy', amount: '0.3 BTC', date: '2023-11-15T14:20:00Z' },
      { id: 2, type: 'Sell', amount: '0.2 BTC', date: '2023-11-18T16:45:00Z' }
    ]
  },
  {
    id: 'TRX-002',
    date: '2023-11-20T10:15:00Z',
    type: 'giftcard',
    status: 'flagged',
    amount: '$500 Amazon Card',
    user: {
      id: 2,
      username: 'janedoe',
      email: 'jane.doe@example.com'
    },
    evidence: 'https://example.com/evidence/002.jpg',
    tradeHistory: [{ id: 3, type: 'Sell', amount: '$300 iTunes Card', date: '2023-11-19T11:30:00Z' }],
    flagReason: 'Suspicious card code pattern'
  },
  {
    id: 'TRX-003',
    date: '2023-11-20T11:00:00Z',
    type: 'crypto',
    status: 'pending',
    amount: '2.5 ETH',
    user: {
      id: 3,
      username: 'mikebrown',
      email: 'mike.brown@example.com'
    },
    evidence: 'https://example.com/evidence/003.jpg',
    tradeHistory: [{ id: 4, type: 'Buy', amount: '1.5 ETH', date: '2023-11-20T10:45:00Z' }]
  },
  {
    id: 'TRX-004',
    date: '2023-11-20T11:45:00Z',
    type: 'giftcard',
    status: 'completed',
    amount: '$1000 Steam Card',
    user: {
      id: 4,
      username: 'sarahsmith',
      email: 'sarah.smith@example.com'
    },
    evidence: 'https://example.com/evidence/004.jpg',
    tradeHistory: [
      { id: 5, type: 'Sell', amount: '$500 Steam Card', date: '2023-11-17T09:15:00Z' },
      { id: 6, type: 'Buy', amount: '$200 Steam Card', date: '2023-11-19T13:20:00Z' }
    ]
  },
  {
    id: 'TRX-005',
    date: '2023-11-20T12:30:00Z',
    type: 'crypto',
    status: 'flagged',
    amount: '10,000 USDT',
    user: {
      id: 5,
      username: 'alexjones',
      email: 'alex.jones@example.com'
    },
    evidence: 'https://example.com/evidence/005.jpg',
    tradeHistory: [{ id: 7, type: 'Buy', amount: '5,000 USDT', date: '2023-11-20T12:15:00Z' }],
    flagReason: 'Large transaction amount'
  }
];

// Status color mapping
export const statusColors = {
  completed: 'success',
  pending: 'warning',
  flagged: 'error'
};

// Transaction type icons
export const typeIcons = {
  crypto: '₿',
  giftcard: '🎁'
};

// Mock statistics for dashboard
export const mockStats = {
  today: {
    total: 157,
    completed: 98,
    pending: 42,
    flagged: 17
  },
  volume: {
    crypto: {
      BTC: 12.5,
      ETH: 45.8,
      USDT: 25000
    },
    giftcard: {
      'Amazon US': 15000,
      iTunes: 8500,
      Steam: 12000
    }
  }
};

// Export format configuration
export const exportConfig = {
  fields: [
    { label: 'Transaction ID', value: 'id' },
    { label: 'Date', value: 'date' },
    { label: 'Type', value: 'type' },
    { label: 'Status', value: 'status' },
    { label: 'Amount', value: 'amount' },
    { label: 'User', value: 'user.username' },
    { label: 'Email', value: 'user.email' }
  ],
  fileName: 'transactions-export'
};
