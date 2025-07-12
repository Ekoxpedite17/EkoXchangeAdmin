import {
  IconUsers,
  IconCreditCard,
  IconGift,
  IconCurrencyBitcoin,
  IconMessageCircle,
  IconChartBar,
  IconShieldLock,
} from "@tabler/icons-react";

// User Management Group
const userManagement = {
  id: "usermanagement-group",
  title: "User Management",
  type: "group",
  children: [
    {
      id: "usermanagement",
      title: "User Management",
      type: "item",
      url: "/usermanagement",
      icon: IconUsers,
      target: false,
    },
  ],
};

// Gift Card Management Group
const giftCardManagement = {
  id: "giftcard-group",
  title: "Gift Card Management",
  type: "group",
  children: [
    {
      id: "giftcard",
      title: "Gift Card Management",
      type: "item",
      url: "/giftcard",
      icon: IconGift,
      target: false,
    },
  ],
};

// Transaction Monitoring Group
const transactionMonitoring = {
  id: "transactions-group",
  title: "Transaction Monitoring",
  type: "group",
  children: [
    {
      id: "transactions",
      title: "Transaction Monitoring",
      type: "item",
      url: "/transaction",
      icon: IconCreditCard,
      target: false,
    },
  ],
};

// Crypto Management Group
const cryptoManagement = {
  id: "crypto-management-group",
  title: "Crypto Management",
  type: "group",
  children: [
    {
      id: "crypto-management",
      title: "Crypto Management",
      type: "item",
      url: "/crypto-management",
      icon: IconCurrencyBitcoin,
      target: false,
    },
  ],
};

// Disputes & Support Group
const disputesSupport = {
  id: "disputes-support-group",
  title: "Disputes & Support",
  type: "group",
  children: [
    {
      id: "disputes-support",
      title: "Disputes & Support",
      type: "item",
      url: "/disputes-support",
      icon: IconMessageCircle,
      target: false,
    },
  ],
};

// Reporting & Analytics Group
const reportingAnalytics = {
  id: "reporting-analytics-group",
  title: "Reporting & Analytics",
  type: "group",
  children: [
    {
      id: "reporting-analytics",
      title: "Reporting & Analytics",
      type: "item",
      url: "/reporting-analytics",
      icon: IconChartBar,
      target: false,
    },
  ],
};

// Roles & Permissions Group
const rolesPermissions = {
  id: "roles-permissions-group",
  title: "Roles & Permissions",
  type: "group",
  children: [
    {
      id: "roles-permissions",
      title: "Roles & Permissions",
      type: "item",
      url: "/roles-permissions",
      icon: IconShieldLock,
      target: false,
    },
  ],
};

// Referrals Group
const referrals = {
  id: "referrals-group",
  title: "Referrals",
  type: "group",
  children: [
    {
      id: "referrals",
      title: "Referrals",
      type: "item",
      url: "/referrals",
      icon: IconUsers,
      target: false,
    },
  ],
};

export {
  userManagement,
  transactionMonitoring,
  giftCardManagement,
  cryptoManagement,
  disputesSupport,
  reportingAnalytics,
  rolesPermissions,
  referrals,
};
