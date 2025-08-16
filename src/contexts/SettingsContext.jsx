import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSettings } from '../redux/reducers/settings.reducer';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  // Default settings data that will be loaded if no persisted data exists
  const defaultSettings = {
    general: {
      appName: "EkoXchange",
      timezone: "Africa/Lagos",
      maintenance: false,
      currency: "NGN"
    },
    security: {
      enforce2FA: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      loginAttemptLimit: 5,
      ipList: ""
    },
    notifications: {
      email: {
        enabled: true,
        template: "Dear {{user}},\nYour transaction was successful.",
        senderEmail: "noreply@ekoxchange.com"
      },
      sms: {
        enabled: false,
        provider: "twilio",
        apiKey: "",
        fromNumber: ""
      },
      push: {
        enabled: true,
        provider: "firebase",
        config: {
          apiKey: "",
          authDomain: "",
          projectId: "",
          storageBucket: "",
          messagingSenderId: "",
          appId: ""
        },
        template: "{{title}}\n{{body}}",
        categories: ["transaction", "security", "promotional", "system"],
        selectedCategories: ["transaction", "security"]
      }
    },
    rateManagement: {
      notifyEnabled: false,
      lastChanged: {
        by: "AdminUser",
        at: new Date(Date.now() - 86400000).toISOString()
      },
      methods: ["email"],
      threshold: 1.0,
      recipients: "admins",
      log: [
        {
          id: 1,
          timestamp: "2024-08-02 09:45 AM",
          token: "BTC",
          oldRate: 1500,
          newRate: 1545,
          percent: 3.0,
          triggered: true,
          channels: ["email", "push"],
          recipients: "Admins",
          status: "Success",
          deliveryDetails: {
            email: { status: "Success", count: 5 },
            push: { status: "Success", count: 3 }
          }
        },
        {
          id: 2,
          timestamp: "2024-08-01 11:20 AM",
          token: "ETH",
          oldRate: 2000,
          newRate: 2010,
          percent: 0.5,
          triggered: false,
          channels: ["email"],
          recipients: "Users",
          status: "Skipped (Below Threshold)",
          deliveryDetails: null
        },
        {
          id: 3,
          timestamp: "2024-08-01 08:15 AM",
          token: "SOL",
          oldRate: 1200,
          newRate: 1260,
          percent: 5.0,
          triggered: true,
          channels: ["email", "sms", "push"],
          recipients: "Both",
          status: "Partial Success",
          deliveryDetails: {
            email: { status: "Success", count: 12 },
            sms: { status: "Failed", count: 2, error: "Invalid phone number" },
            push: { status: "Success", count: 8 }
          }
        }
      ]
    },
    apiIntegrations: {
      apiKeys: [
        { 
          id: "key1",
          name: "Partner App V1", 
          key: "sk_live_************", 
          active: true, 
          createdAt: "2023-10-15T14:30:00Z",
          createdBy: "admin@example.com",
          scope: "full-access",
          lastUsed: "2023-11-01T09:15:22Z"
        }
      ],
      priceSource: "CoinGecko",
      priceInterval: "60",
      lastSyncTime: "2023-11-05T10:30:45Z",
      syncStatus: "success",
      fraudApi: {
        enabled: true,
        provider: "Chainalysis",
        token: "fd_live_************",
        timeout: "2",
        health: "healthy"
      },
      webhooks: [
        { 
          id: "wh1",
          event: "order.completed", 
          url: "https://partner.example.com/webhooks/orders",
          authToken: "wh_token_************",
          retries: 3,
          retryInterval: 30,
          active: true,
          lastDelivery: {
            status: "success",
            timestamp: "2023-11-04T16:45:12Z",
            responseCode: 200
          }
        }
      ]
    },
    userRoles: {
      roles: [
        { id: 1, name: "Super Admin", description: "Full system access", isSystem: true, adminCount: 1 },
        { id: 2, name: "Finance Manager", description: "Manages financial operations", isSystem: false, adminCount: 2 },
        { id: 3, name: "Support Agent", description: "Handles customer support", isSystem: false, adminCount: 3 }
      ],
      admins: [
        { id: 1, email: "superadmin@example.com", name: "John Doe", roleId: 1, isCurrentUser: true },
        { id: 2, email: "finance@example.com", name: "Jane Smith", roleId: 2, isCurrentUser: false },
        { id: 3, email: "support1@example.com", name: "Mike Johnson", roleId: 3, isCurrentUser: false },
        { id: 4, email: "support2@example.com", name: "Sarah Williams", roleId: 3, isCurrentUser: false },
        { id: 5, email: "finance2@example.com", name: "Robert Brown", roleId: 2, isCurrentUser: false }
      ],
      permissionMatrix: {},
      auditLog: [
        {
          id: 1,
          action: "Role Created",
          details: "Created role 'Finance Manager'",
          admin: "John Doe",
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          action: "Permission Changed",
          details: "Enabled 'Approve' for 'Transactions' module for 'Finance Manager'",
          admin: "John Doe",
          timestamp: new Date(Date.now() - 43200000).toISOString()
        },
        {
          id: 3,
          action: "Role Assigned",
          details: "Assigned 'Support Agent' role to 'support2@example.com'",
          admin: "John Doe",
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    },
    loggingAudit: {
      activityLogs: [],
      loginLogs: [],
      systemChanges: [],
      settings: {
        alertSuspicious: true,
        alertMethod: "email",
        retentionPeriod: 180,
        archiveOldLogs: true
      },
      filters: {
        activity: {
          keyword: "",
          admin: "",
          dateRange: { start: null, end: null },
          status: ""
        },
        login: {
          admin: "",
          dateRange: { start: null, end: null },
          status: "",
          ipAddress: ""
        },
        system: {
          setting: "",
          admin: "",
          dateRange: { start: null, end: null },
          category: ""
        }
      }
    },
    adBanners: {
      banners: [],
      selectedBanner: null,
      bannerForm: {
        name: "",
        type: "header",
        position: "top",
        url: "",
        startDate: "",
        endDate: "",
        isActive: true,
        priority: 5,
        file: null,
        originalFile: null,
        resizedFile: null,
        status: "draft"
      }
    }
  };

  useEffect(() => {
    // Initialize settings with default data if not already present
    // This will only run once when the component mounts
    if (!settings.general.appName || settings.general.appName === "EkoXchange") {
      console.log('🔄 Initializing settings with default data...');
      dispatch(initializeSettings({ settings: defaultSettings }));
    } else {
      console.log('✅ Settings already initialized from persisted state');
    }
  }, [dispatch, settings.general.appName]);

  const value = {
    settings,
    defaultSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
