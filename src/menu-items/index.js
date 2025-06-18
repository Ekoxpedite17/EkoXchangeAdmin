import dashboard from './dashboard';
import {
  userManagement,
  giftCardManagement,
  transactionMonitoring,
  cryptoManagement,
  disputesSupport,
  reportingAnalytics,
  rolesPermissions
} from './pages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    userManagement,
    cryptoManagement,
    transactionMonitoring,
    giftCardManagement,
    disputesSupport,
    reportingAnalytics,
    rolesPermissions
  ]
};

export default menuItems;
