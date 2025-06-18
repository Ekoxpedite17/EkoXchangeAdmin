import { createBrowserRouter } from "react-router-dom";

// routes
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";

const router = createBrowserRouter([MainRoutes, AuthenticationRoutes], {});

export default router;
