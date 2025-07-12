import dashboard from "./dashboard";
import {
  userManagement,
  giftCardManagement,
  transactionMonitoring,
  cryptoManagement,
  disputesSupport,
  reportingAnalytics,
  rolesPermissions,
  referrals,
} from "./pages";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    userManagement,
    cryptoManagement,
    transactionMonitoring,
    giftCardManagement,
    referrals,
    disputesSupport,
    reportingAnalytics,
    rolesPermissions,
  ],
};

export default menuItems;
