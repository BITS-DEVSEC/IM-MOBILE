import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import InsuranceWizard from "./pages/customer/marketplace/InsuranceWizard";
import CarDetails from "./pages/customer/policy/CarDetails";
import AccountSettingsPage from "./pages/customer/account/AccountSettingsPage";
import PoliciesTabs from "./pages/customer/policy/PoliciesTabs";
import HomePolicyDetails from "./pages/customer/policy/HomePolicyDetails";
import LifePolicyDetails from "./pages/customer/policy/LifePolicyDetails";
import { Dashboard } from "./pages/customer/Dashboard";
import { LearningCenter } from "./pages/customer/LearningCenter";
import { ClaimsFeature } from "./pages/customer/ClaimFeature";
import { NewClaimForm } from "./pages/customer/NewClaimForm";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { VerifyOtp } from "./pages/auth/VerifyOtp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { RoleLayout } from "./layouts/RoleLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const InsurerHome = () => <h1>Insurer Home</h1>;
const InsurerListings = () => <h1>Insurer Listings</h1>;

const CustomerHome = () => <h1>Customer Home</h1>;
const CustomerListings = () => <h1>Customer Listings</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/policies" element={<PoliciesTabs />} />
              <Route path="/policies/motor/:id" element={<CarDetails />} />
              <Route
                path="/policies/home/:id"
                element={<HomePolicyDetails />}
              />
              <Route
                path="/policies/life/:id"
                element={<LifePolicyDetails />}
              />
              <Route path="/account" element={<AccountSettingsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<LearningCenter />} />
              <Route path="/claims/*" element={<ClaimsFeature />} />
              <Route path="/claims/new" element={<NewClaimForm />} />

              <Route path="/insurer" element={<RoleLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<InsurerHome />} />
                <Route path="listings" element={<InsurerListings />} />
              </Route>

              <Route path="/customer" element={<RoleLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<CustomerHome />} />
                <Route path="listings" element={<CustomerListings />} />
              </Route>

              <Route path="/insurance" element={<InsuranceWizard />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}
