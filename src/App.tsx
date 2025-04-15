import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/Reservations";
import Services from "./components/Services";
import Payments from "./components/Payments";
import CustomFields from "./components/CustomFields";
import Settings from "./components/Settings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Subscription from "./components/subscription/Subscription";
import { useAuthStore } from "./store/auth";
import { useSubscriptionStore } from "./store/subscription";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentPlan = useSubscriptionStore((state) => state.currentPlan);

  // Protected route wrapper
  const ProtectedRoute = ({
    children,
    requireSubscription = true,
  }: {
    children: React.ReactNode;
    requireSubscription?: boolean;
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Only check for subscription if required and user is not on subscription-related pages
    if (
      requireSubscription &&
      !currentPlan &&
      !window.location.pathname.includes("/subscription")
    ) {
      return <Navigate to="/subscription" />;
    }

    return <>{children}</>;
  };

  // Auth route wrapper - redirects to dashboard if already authenticated
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  // Auth layout - full screen without sidebar
  const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {children}
    </div>
  );

  // Main layout - with sidebar
  const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex-1">{children}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <AuthLayout>
                <Register />
              </AuthLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute requireSubscription={false}>
              <AuthLayout>
                <Subscription />
              </AuthLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireSubscription={false}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireSubscription={false}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Reservations />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Services />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Payments />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/custom-fields"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CustomFields />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
