import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./AdminRoutes";
import { moderatorPaths } from "./ModeratorRoutes";
import { vendorPaths } from "./VendorRoutes";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/moderator",
    element: <App />,
    children: routeGenerator(moderatorPaths),
  },
  {
    path: "/vendor",
    element: <App />,
    children: routeGenerator(vendorPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
