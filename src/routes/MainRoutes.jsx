import { lazy } from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import ProtectedRoute from "./ProtectedRoute";
import UserManagement from "../views/usermanagement/usermanagement";
import GiftCardManagement from "../views/giftcard/giftcard";
import TransactionManagement from "../views/transactions/transaction";
import CryptoManagement from "../views/crypto/cryptomanagement";
import DisputesSupport from "../views/disputes/disputes";
import ReportingAnalytics from "../views/reporting/reporting";
import RolesPermissions from "../views/roles/roles";
import Referrals from "../views/referrals/referrals";
import Settings from "../views/settings/settings";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    // Group protected routes
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <DashboardDefault />,
        },
        {
          path: "/usermanagement",
          element: <UserManagement />,
        },
        {
          path: "/crypto-management",
          element: <CryptoManagement />,
        },
        {
          path: "/transaction",
          element: <TransactionManagement />,
        },
        {
          path: "/giftcard",
          element: <GiftCardManagement />,
        },
        {
          path: "/disputes-support",
          element: <DisputesSupport />,
        },
        {
          path: "/referrals",
          element: <Referrals />,
        },
        {
          path: "/reporting-analytics",
          element: <ReportingAnalytics />,
        },
        {
          path: "/roles-permissions",
          element: <RolesPermissions />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    // Public route

    // Fallback redirect
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
};

export default MainRoutes;
