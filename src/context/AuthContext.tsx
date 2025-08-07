import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useTokenRefresh } from "../hooks/useTokenRefresh";

interface User {
  id: number;
  email?: string;
  phone_number?: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: {
    email?: string;
    phone_number?: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  registerCustomer: (data: {
    phone_number: string;
    fin: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  registerUser: (data: {
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => Promise<void>;
  verifyOtp: (data: { phone_number: string; otp: string }) => Promise<void>;
  verifyEmail: (data: {
    email: string;
    verification_token: string;
  }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: {
    email: string;
    reset_token: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  refreshAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useTokenRefresh({ accessToken, setAccessToken, setUser, setIsLoading });

  const login = async (credentials: {
    email?: string;
    phone_number?: string;
    password: string;
  }) => {
    const data = await authService.login(credentials);
    setUser(data.data.user);
    setAccessToken(data.data.access_token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    navigate("/dashboard");
  };

  const logout = async () => {
    await authService.logout(accessToken);
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const registerCustomer = async (data: {
    phone_number: string;
    fin: string;
    password: string;
    password_confirmation: string;
  }) => {
    await authService.registerCustomer(data);
    navigate(`/verify-otp?phone=${encodeURIComponent(data.phone_number)}`);
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => {
    await authService.registerUser(data);
    navigate("/login");
  };

  const verifyOtp = async (data: { phone_number: string; otp: string }) => {
    const response = await authService.verifyOtp(data);
    setUser(response.data.user);
    setAccessToken(response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/dashboard");
  };

  const verifyEmail = async (data: {
    email: string;
    verification_token: string;
  }) => {
    await authService.verifyEmail(data);
    navigate("/login");
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const resetPassword = async (data: {
    email: string;
    reset_token: string;
    password: string;
    password_confirmation: string;
  }) => {
    await authService.resetPassword(data);
    navigate("/login");
  };

  const refreshAuthToken = async () => {
    const data = await authService.refreshAuthToken();
    setAccessToken(data.data.access_token);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        isLoading,
        login,
        logout,
        registerCustomer,
        registerUser,
        verifyOtp,
        verifyEmail,
        forgotPassword,
        resetPassword,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
