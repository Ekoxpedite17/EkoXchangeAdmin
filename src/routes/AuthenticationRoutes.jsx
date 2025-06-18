import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const LoginPage = Loadable(
  lazy(() => import("../views/auth/authentication/Login.jsx"))
);

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
  ],
};

export default AuthenticationRoutes;
