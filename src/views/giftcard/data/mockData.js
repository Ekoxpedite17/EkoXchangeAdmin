// Mock data for Redemption Stats
export const mockRedemptionStats = {
  chartData: [
    { time: '00:00', success: 85, failure: 15 },
    { time: '04:00', success: 90, failure: 10 },
    { time: '08:00', success: 88, failure: 12 },
    { time: '12:00', success: 92, failure: 8 },
    { time: '16:00', success: 87, failure: 13 },
    { time: '20:00', success: 89, failure: 11 }
  ],
  successRate: 88.5,
  failureRate: 11.5,
  totalVolume: 1250,
  dailyStats: {
    totalTransactions: 245,
    successfulTransactions: 217,
    failedTransactions: 28
  }
};

// Mock data for Gift Card Categories
export const mockCategories = [
  {
    id: 1,
    name: 'Amazon US',
    provider: 'DirectConnect',
    rate: 0.85,
    status: 'Active',
    minAmount: 25,
    maxAmount: 2000,
    supportedDenominations: [25, 50, 100, 200, 500, 1000, 2000]
  },
  {
    id: 2,
    name: 'iTunes US',
    provider: 'CardExchange',
    rate: 0.80,
    status: 'Active',
    minAmount: 10,
    maxAmount: 500,
    supportedDenominations: [10, 25, 50, 100, 200, 500]
  },
  {
    id: 3,
    name: 'Steam',
    provider: 'DirectConnect',
    rate: 0.82,
    status: 'Active',
    minAmount: 20,
    maxAmount: 1000,
    supportedDenominations: [20, 50, 100, 200, 500, 1000]
  },
  {
    id: 4,
    name: 'Google Play US',
    provider: 'CardExchange',
    rate: 0.78,
    status: 'Inactive',
    minAmount: 10,
    maxAmount: 500,
    supportedDenominations: [10, 25, 50, 100, 200, 500]
  },
  {
    id: 5,
    name: 'Walmart',
    provider: 'GiftCardPro',
    rate: 0.75,
    status: 'Active',
    minAmount: 50,
    maxAmount: 1000,
    supportedDenominations: [50, 100, 200, 500, 1000]
  }
];

// Mock data for Gift Card Providers
export const mockProviders = [
  {
    id: 1,
    name: 'DirectConnect',
    apiKey: 'dc_live_xK8yJ2mP9nQ4vR5t',
    active: true,
    uptime: 99.8,
    lastDowntime: '2023-11-15T08:30:00Z',
    supportedCards: ['Amazon US', 'Steam', 'Xbox'],
    apiEndpoint: 'https://api.directconnect.com/v1'
  },
  {
    id: 2,
    name: 'CardExchange',
    apiKey: 'ce_prod_hN7kL9mR2wX5vB8q',
    active: true,
    uptime: 99.5,
    lastDowntime: '2023-11-10T14:20:00Z',
    supportedCards: ['iTunes US', 'Google Play US', 'PlayStation'],
    apiEndpoint: 'https://api.cardexchange.com/v2'
  },
  {
    id: 3,
    name: 'GiftCardPro',
    apiKey: 'gcp_live_tM4wQ7nJ9pK2xL5v',
    active: true,
    uptime: 99.9,
    lastDowntime: '2023-11-01T02:15:00Z',
    supportedCards: ['Walmart', 'Target', 'Best Buy'],
    apiEndpoint: 'https://api.giftcardpro.com/v1'
  }
];

// Mock data for Validation Override History
export const mockValidationHistory = [
  {
    id: 1,
    cardCode: 'AMZN-US-123456789',
    category: 'Amazon US',
    originalStatus: 'Failed',
    overrideDate: '2023-11-20T09:15:00Z',
    adminUser: 'support_agent1',
    reason: 'Valid receipt provided by user via email',
    newStatus: 'Approved'
  },
  {
    id: 2,
    cardCode: 'ITNS-US-987654321',
    category: 'iTunes US',
    originalStatus: 'Failed',
    overrideDate: '2023-11-19T14:30:00Z',
    adminUser: 'support_agent2',
    reason: 'Confirmed valid transaction with provider',
    newStatus: 'Approved'
  },
  {
    id: 3,
    cardCode: 'STEAM-456789123',
    category: 'Steam',
    originalStatus: 'Pending',
    overrideDate: '2023-11-18T11:45:00Z',
    adminUser: 'support_agent1',
    reason: 'Manual verification completed with Steam support',
    newStatus: 'Approved'
  }
];

// Status color mapping
export const statusColors = {
  Active: 'success',
  Inactive: 'error',
  Pending: 'warning'
};

// Transaction status mapping
export const transactionStatus = {
  Approved: 'success',
  Failed: 'error',
  Pending: 'warning',
  Override: 'info'
};