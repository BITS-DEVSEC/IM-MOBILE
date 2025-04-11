import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RoleLayout } from "./layouts/RoleLayout";
import { AuthProvider } from "./context/AuthContext";
import InsuranceWizard from "./pages/customer/home/InsuranceWizard";
import Login from "./pages/auth/login";
import PinPass from "./pages/auth/pinPass";
import CarDetails from "./pages/customer/policy/CarDetails";
import AccountSettingsPage from "./pages/customer/account/AccountSettingsPage";
import PoliciesTabs from "./pages/customer/policy/PoliciesTabs";
import HomePolicyDetails from "./pages/customer/policy/HomePolicyDetails";
import LifePolicyDetails from "./pages/customer/policy/LifePolicyDetails";

const InsurerHome = () => <h1>Insurer Home</h1>;
const InsurerListings = () => <h1>Insurer Listings</h1>;
const AdminHome = () => <h1>Admin Home</h1>;
const AdminListings = () => <h1>Admin Listings</h1>;
const CustomerHome = () => <h1>Customer Home</h1>;
const CustomerListings = () => <h1>Customer Listings</h1>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pin" element={<PinPass />} />
          <Route path="/policies" element={<PoliciesTabs />} />
          <Route path="/policies/motor/:id" element={<CarDetails />} />
          <Route path="/policies/home/:id" element={<HomePolicyDetails />} />
          <Route path="/policies/life/:id" element={<LifePolicyDetails />} />
          <Route path="/account" element={<AccountSettingsPage />} />
          <Route path="/insurer" element={<RoleLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<InsurerHome />} />
            <Route path="listings" element={<InsurerListings />} />
          </Route>

          <Route path="/admin" element={<RoleLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="listings" element={<AdminListings />} />
          </Route>

          <Route path="/customer" element={<RoleLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<CustomerHome />} />
            <Route path="listings" element={<CustomerListings />} />
          </Route>

          <Route path="/insurance" element={<InsuranceWizard />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
