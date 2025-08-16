import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // General Settings
  general: {
    appName: "EkoXchange",
    timezone: "Africa/Lagos",
    maintenance: false,
    currency: "NGN",
    loading: false,
    error: null,
    success: null
  },

  // Security Settings
  security: {
    enforce2FA: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    loginAttemptLimit: 5,
    ipList: "",
    loading: false,
    error: null,
    success: null
  },

  // Notification Settings
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
    },
    loading: false,
    error: null,
    success: null
  },

  // Rate Management Notification Settings
  rateManagement: {
    notifyEnabled: false,
    lastChanged: {
      by: "AdminUser",
      at: new Date(Date.now() - 86400000).toISOString()
    },
    methods: ["email"],
    threshold: 1.0,
    recipients: "admins",
    log: [],
    loading: false,
    error: null,
    success: null
  },

  // API Integrations
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
    ],
    loading: false,
    error: null,
    success: null
  },

  // User Role Configuration
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
    ],
    loading: false,
    error: null,
    success: null
  },

  // Logging & Audit
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
    },
    loading: false,
    error: null,
    success: null
  },

  // Ad Banner Management
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
    },
    loading: false,
    error: null,
    success: null
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // General Settings Actions
    setGeneralSettings: (state, action) => {
      state.general = { ...state.general, ...action.payload };
    },
    setGeneralLoading: (state, action) => {
      state.general.loading = action.payload;
    },
    setGeneralError: (state, action) => {
      state.general.error = action.payload;
    },
    setGeneralSuccess: (state, action) => {
      state.general.success = action.payload;
    },

    // Security Settings Actions
    setSecuritySettings: (state, action) => {
      state.security = { ...state.security, ...action.payload };
    },
    setSecurityLoading: (state, action) => {
      state.security.loading = action.payload;
    },
    setSecurityError: (state, action) => {
      state.security.error = action.payload;
    },
    setSecuritySuccess: (state, action) => {
      state.security.success = action.payload;
    },

    // Notification Settings Actions
    setNotificationSettings: (state, action) => {
      const { type, settings } = action.payload;
      state.notifications[type] = { ...state.notifications[type], ...settings };
    },
    setNotificationLoading: (state, action) => {
      state.notifications.loading = action.payload;
    },
    setNotificationError: (state, action) => {
      state.notifications.error = action.payload;
    },
    setNotificationSuccess: (state, action) => {
      state.notifications.success = action.payload;
    },

    // Rate Management Actions
    setRateManagementSettings: (state, action) => {
      state.rateManagement = { ...state.rateManagement, ...action.payload };
    },
    setRateManagementLoading: (state, action) => {
      state.rateManagement.loading = action.payload;
    },
    setRateManagementError: (state, action) => {
      state.rateManagement.error = action.payload;
    },
    setRateManagementSuccess: (state, action) => {
      state.rateManagement.success = action.payload;
    },
    updateRateManagementLog: (state, action) => {
      state.rateManagement.log = action.payload;
    },

    // API Integrations Actions
    setApiIntegrations: (state, action) => {
      state.apiIntegrations = { ...state.apiIntegrations, ...action.payload };
    },
    addApiKey: (state, action) => {
      state.apiIntegrations.apiKeys.push(action.payload);
    },
    updateApiKey: (state, action) => {
      const { id, updates } = action.payload;
      const keyIndex = state.apiIntegrations.apiKeys.findIndex(key => key.id === id);
      if (keyIndex !== -1) {
        state.apiIntegrations.apiKeys[keyIndex] = { ...state.apiIntegrations.apiKeys[keyIndex], ...updates };
      }
    },
    removeApiKey: (state, action) => {
      state.apiIntegrations.apiKeys = state.apiIntegrations.apiKeys.filter(key => key.id !== action.payload);
    },
    addWebhook: (state, action) => {
      state.apiIntegrations.webhooks.push(action.payload);
    },
    updateWebhook: (state, action) => {
      const { id, updates } = action.payload;
      const webhookIndex = state.apiIntegrations.webhooks.findIndex(webhook => webhook.id === id);
      if (webhookIndex !== -1) {
        state.apiIntegrations.webhooks[webhookIndex] = { ...state.apiIntegrations.webhooks[webhookIndex], ...updates };
      }
    },
    removeWebhook: (state, action) => {
      state.apiIntegrations.webhooks = state.apiIntegrations.webhooks.filter(webhook => webhook.id !== action.payload);
    },
    setApiIntegrationsLoading: (state, action) => {
      state.apiIntegrations.loading = action.payload;
    },
    setApiIntegrationsError: (state, action) => {
      state.apiIntegrations.error = action.payload;
    },
    setApiIntegrationsSuccess: (state, action) => {
      state.apiIntegrations.success = action.payload;
    },

    // User Role Actions
    setRoles: (state, action) => {
      state.userRoles.roles = action.payload;
    },
    addRole: (state, action) => {
      state.userRoles.roles.push(action.payload);
    },
    updateRole: (state, action) => {
      const { id, updates } = action.payload;
      const roleIndex = state.userRoles.roles.findIndex(role => role.id === id);
      if (roleIndex !== -1) {
        state.userRoles.roles[roleIndex] = { ...state.userRoles.roles[roleIndex], ...updates };
      }
    },
    removeRole: (state, action) => {
      state.userRoles.roles = state.userRoles.roles.filter(role => role.id !== action.payload);
    },
    setAdmins: (state, action) => {
      state.userRoles.admins = action.payload;
    },
    updateAdmin: (state, action) => {
      const { id, updates } = action.payload;
      const adminIndex = state.userRoles.admins.findIndex(admin => admin.id === id);
      if (adminIndex !== -1) {
        state.userRoles.admins[adminIndex] = { ...state.userRoles.admins[adminIndex], ...updates };
      }
    },
    setPermissionMatrix: (state, action) => {
      state.userRoles.permissionMatrix = action.payload;
    },
    updatePermission: (state, action) => {
      const { moduleKey, roleId, action: permissionAction, value } = action.payload;
      if (!state.userRoles.permissionMatrix[moduleKey]) {
        state.userRoles.permissionMatrix[moduleKey] = {};
      }
      if (!state.userRoles.permissionMatrix[moduleKey][roleId]) {
        state.userRoles.permissionMatrix[moduleKey][roleId] = {};
      }
      state.userRoles.permissionMatrix[moduleKey][roleId][permissionAction] = value;
    },
    addAuditLogEntry: (state, action) => {
      state.userRoles.auditLog.unshift(action.payload);
    },
    setUserRolesLoading: (state, action) => {
      state.userRoles.loading = action.payload;
    },
    setUserRolesError: (state, action) => {
      state.userRoles.error = action.payload;
    },
    setUserRolesSuccess: (state, action) => {
      state.userRoles.success = action.payload;
    },

    // Logging & Audit Actions
    setActivityLogs: (state, action) => {
      state.loggingAudit.activityLogs = action.payload;
    },
    setLoginLogs: (state, action) => {
      state.loggingAudit.loginLogs = action.payload;
    },
    setSystemChanges: (state, action) => {
      state.loggingAudit.systemChanges = action.payload;
    },
    setLoggingSettings: (state, action) => {
      state.loggingAudit.settings = { ...state.loggingAudit.settings, ...action.payload };
    },
    setLoggingFilters: (state, action) => {
      const { type, filters } = action.payload;
      state.loggingAudit.filters[type] = { ...state.loggingAudit.filters[type], ...filters };
    },
    resetLoggingFilters: (state, action) => {
      const type = action.payload;
      if (type === 'activity') {
        state.loggingAudit.filters.activity = {
          keyword: "",
          admin: "",
          dateRange: { start: null, end: null },
          status: ""
        };
      } else if (type === 'login') {
        state.loggingAudit.filters.login = {
          admin: "",
          dateRange: { start: null, end: null },
          status: "",
          ipAddress: ""
        };
      } else if (type === 'system') {
        state.loggingAudit.filters.system = {
          setting: "",
          admin: "",
          dateRange: { start: null, end: null },
          category: ""
        };
      }
    },
    setLoggingLoading: (state, action) => {
      state.loggingAudit.loading = action.payload;
    },
    setLoggingError: (state, action) => {
      state.loggingAudit.error = action.payload;
    },
    setLoggingSuccess: (state, action) => {
      state.loggingAudit.success = action.payload;
    },

    // Ad Banner Actions
    setBanners: (state, action) => {
      state.adBanners.banners = action.payload;
    },
    addBanner: (state, action) => {
      state.adBanners.banners.push(action.payload);
    },
    updateBanner: (state, action) => {
      const { id, updates } = action.payload;
      const bannerIndex = state.adBanners.banners.findIndex(banner => banner.id === id);
      if (bannerIndex !== -1) {
        state.adBanners.banners[bannerIndex] = { ...state.adBanners.banners[bannerIndex], ...updates };
      }
    },
    removeBanner: (state, action) => {
      state.adBanners.banners = state.adBanners.banners.filter(banner => banner.id !== action.payload);
    },
    setSelectedBanner: (state, action) => {
      state.adBanners.selectedBanner = action.payload;
    },
    setBannerForm: (state, action) => {
      state.adBanners.bannerForm = { ...state.adBanners.bannerForm, ...action.payload };
    },
    resetBannerForm: (state) => {
      state.adBanners.bannerForm = {
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
      };
    },
    setAdBannersLoading: (state, action) => {
      state.adBanners.loading = action.payload;
    },
    setAdBannersError: (state, action) => {
      state.adBanners.error = action.payload;
    },
    setAdBannersSuccess: (state, action) => {
      state.adBanners.success = action.payload;
    },

    // Clear all success/error messages
    clearMessages: (state) => {
      state.general.success = null;
      state.general.error = null;
      state.security.success = null;
      state.security.error = null;
      state.notifications.success = null;
      state.notifications.error = null;
      state.rateManagement.success = null;
      state.rateManagement.error = null;
      state.apiIntegrations.success = null;
      state.apiIntegrations.error = null;
      state.userRoles.success = null;
      state.userRoles.error = null;
      state.loggingAudit.success = null;
      state.loggingAudit.error = null;
      state.adBanners.success = null;
      state.adBanners.error = null;
    },

    // Initialize settings with default data if not already present
    initializeSettings: (state, action) => {
      const { settings } = action.payload;
      
      // Only initialize if the state is empty (first time loading)
      if (!state.general.appName || state.general.appName === "EkoXchange") {
        if (settings.general) {
          state.general = { ...state.general, ...settings.general };
        }
        if (settings.security) {
          state.security = { ...state.security, ...settings.security };
        }
        if (settings.notifications) {
          state.notifications = { ...state.notifications, ...settings.notifications };
        }
        if (settings.rateManagement) {
          state.rateManagement = { ...state.rateManagement, ...settings.rateManagement };
        }
        if (settings.apiIntegrations) {
          state.apiIntegrations = { ...state.apiIntegrations, ...settings.apiIntegrations };
        }
        if (settings.userRoles) {
          state.userRoles = { ...state.userRoles, ...settings.userRoles };
        }
        if (settings.loggingAudit) {
          state.loggingAudit = { ...state.loggingAudit, ...settings.loggingAudit };
        }
        if (settings.adBanners) {
          state.adBanners = { ...state.adBanners, ...settings.adBanners };
        }
      }
    }
  }
});

export const {
  // General Settings
  setGeneralSettings,
  setGeneralLoading,
  setGeneralError,
  setGeneralSuccess,

  // Security Settings
  setSecuritySettings,
  setSecurityLoading,
  setSecurityError,
  setSecuritySuccess,

  // Notification Settings
  setNotificationSettings,
  setNotificationLoading,
  setNotificationError,
  setNotificationSuccess,

  // Rate Management
  setRateManagementSettings,
  setRateManagementLoading,
  setRateManagementError,
  setRateManagementSuccess,
  updateRateManagementLog,

  // API Integrations
  setApiIntegrations,
  addApiKey,
  updateApiKey,
  removeApiKey,
  addWebhook,
  updateWebhook,
  removeWebhook,
  setApiIntegrationsLoading,
  setApiIntegrationsError,
  setApiIntegrationsSuccess,

  // User Roles
  setRoles,
  addRole,
  updateRole,
  removeRole,
  setAdmins,
  updateAdmin,
  setPermissionMatrix,
  updatePermission,
  addAuditLogEntry,
  setUserRolesLoading,
  setUserRolesError,
  setUserRolesSuccess,

  // Logging & Audit
  setActivityLogs,
  setLoginLogs,
  setSystemChanges,
  setLoggingSettings,
  setLoggingFilters,
  resetLoggingFilters,
  setLoggingLoading,
  setLoggingError,
  setLoggingSuccess,

  // Ad Banners
  setBanners,
  addBanner,
  updateBanner,
  removeBanner,
  setSelectedBanner,
  setBannerForm,
  resetBannerForm,
  setAdBannersLoading,
  setAdBannersError,
  setAdBannersSuccess,

  // Utility
  clearMessages,
  initializeSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;
